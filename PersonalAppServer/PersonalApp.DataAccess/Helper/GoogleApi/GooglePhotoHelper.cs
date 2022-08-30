using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GooglePhoto;
using System;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using static PersonalApp.Models.GooglePhoto.UploadImage;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public class GooglePhotoHelper : IGooglePhotoHelper
    {
        #region fields

        private readonly IHttpClientFactory _httpClient;

        private readonly HttpClient _client;

        private readonly IConfiguration _configuration;

        private UserCredential UserCredential { get; set; }

        #endregion

        #region constructor

        public GooglePhotoHelper(IHttpClientFactory httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _client = _httpClient.CreateClient("quizzApp");
        }

        #endregion

        #region override method

        public async Task<ImageResponse> GetImageByIdAsync(string id)
        {
            await CheckAuthorization();
            var rs = await _client.GetAsync(string.Format(GoogleApiConstants.EndPoint.GET_IMAGE_BY_ID, id));
            if (rs.StatusCode == HttpStatusCode.OK)
            {
                var apiContent = await rs.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<ImageResponse>(apiContent);
            }

            return new ImageResponse();
        }


        public async Task CreateAlbum()
        {

            var album = new Album()
            {
                Title = "TestAlbum"
            };
            string jsonString = JsonSerializer.Serialize(new { album });
            var Content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var rs = await _client.PostAsync("https://photoslibrary.googleapis.com/v1/albums", Content);
            var apiContent2 = await rs.Content.ReadAsStringAsync();
        }

        public async Task UploadImageAsync(IFormFile file)
        {
            await CheckAuthorization();
            //await CreateAlbum();

            byte[] fileBytes = { };

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }


            var headers = new List<(string name, string value)>
            {
                (GoogleApiConstants.X_GOOG_UPLOAD_PROTOCOL, "raw")
            };

            if (IsImage(file.FileName))
            {
                headers.Add((GoogleApiConstants.X_GOOG_UPLOAD_CONTENT_TYPE, GetMimeType(file.FileName)));
            }
            var message = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(GoogleApiConstants.EndPoint.UPLOAD_IMAGE_BYTES),
                Content = new ByteArrayContent(fileBytes),
            };
            message.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            foreach (var header in headers)
            {
                message.Headers.Add(header.name, header.value);
            }

            var rs = await _client.SendAsync(message);
            var apiContent = await rs.Content.ReadAsStringAsync();

            var newMediaItem = new UploadImage()
            {
                Description = string.Empty,
                SimpleMediaItem = new SimpleMedia()
                {
                    FileName = Guid.NewGuid().ToString(),
                    UploadToken = apiContent,
                }
            };

            var newMediaItems = new List<UploadImage>() { newMediaItem };
            var albumId = "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ";
            string jsonString = JsonSerializer.Serialize(new { newMediaItems, albumId });

            var message2 = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate"),
                Content = new StringContent(jsonString, Encoding.UTF8, "application/json"),
            };
            var rs2 = await _client.SendAsync(message2);
            var apiContent2 = await rs2.Content.ReadAsStringAsync();

        }



        #endregion

        #region Private method

        /// <summary>
        /// Check author
        /// </summary>
        /// <returns></returns>
        private async Task CheckAuthorization()
        {
            if (UserCredential is null)
            {
                await LoginGoogleAsync();
            }

            if (UserCredential.Token.IsExpired(UserCredential.Flow.Clock))
            {
                await RefreshAccessToken();
            }
        }

        /// <summary>
        /// Author with gg console
        /// </summary>
        /// <returns></returns>
        private async Task LoginGoogleAsync()
        {
            var scope = new List<string>()
            {
               GoogleApiConstants.Scope.READ_ONLY,
               GoogleApiConstants.Scope.APPEND_ONLY,
               GoogleApiConstants.Scope.APP_CREATED_DATA,
            };

            var googleInfo = _configuration.GetSection("GoogleApi");
            var clientId = googleInfo.GetSection("ClientId").Value;
            var clientSecret = googleInfo.GetSection("ClientSecret").Value;
            var user = googleInfo.GetSection("UserName").Value;

            var secrets = new ClientSecrets
            {
                ClientId = clientId,
                ClientSecret = clientSecret
            };

            try
            {
                UserCredential = await GoogleWebAuthorizationBroker.AuthorizeAsync(secrets, scope, user, CancellationToken.None, dataStore: null);
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(UserCredential.Token.TokenType, UserCredential.Token.AccessToken);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// refresh access token when expried
        /// </summary>
        /// <returns></returns>
        private async Task RefreshAccessToken()
        {
            await UserCredential.RefreshTokenAsync(CancellationToken.None);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(UserCredential.Token.TokenType, UserCredential.Token.AccessToken);
        }

        /// <summary>
        /// Check file is image
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        private bool IsImage(string extension) => GoogleApiConstants.AcceptedMimeTypesImage.Contains(GetMimeType(extension));

        /// <summary>
        /// Get mine type
        /// </summary>
        /// <param name="str"></param>
        /// <param name="mimeType"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public static bool TryGetMimeType(string str, out string mimeType)
        {
            var _mappings = new Lazy<IDictionary<string, string>>(GoogleApiConstants.BuildMappings);
            if (str == null)
            {
                throw new ArgumentNullException("str");
            }

            int num = str.IndexOf("?", StringComparison.Ordinal);
            if (num != -1)
            {
                str = str.Remove(num);
            }

            if (!str.StartsWith("."))
            {
                int num2 = str.LastIndexOf(".");
                if (num2 != -1 && str.Length > num2 + 1)
                {
                    str = str.Substring(num2 + 1);
                }

                str = "." + str;
            }

            return _mappings.Value.TryGetValue(str, out mimeType);
        }

        private string GetMimeType(string str) => TryGetMimeType(str, out var mimeType) ? mimeType : "application/octet-stream";
        
        #endregion
    }
}
