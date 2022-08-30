using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GooglePhoto;
using System.Net;
using System.Net.Http.Headers;
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

        public async Task CreateAlbum(string title)
        {
            await CheckAuthorization();
            var album = new Album()
            {
                Title = title
            };

            string jsonString = JsonSerializer.Serialize(new { album });
            var Content = new StringContent(jsonString, Encoding.UTF8, GoogleApiConstants.JSON_TYPE);
            var rs = await _client.PostAsync(GoogleApiConstants.EndPoint.CREATE_ALBUM, Content);
            var apiContent2 = await rs.Content.ReadAsStringAsync();
        }

        public async Task<ImageCreateResponse> UploadImageAsync(IFormFile file, string albumId)
        {
            await CheckAuthorization();
            var uploadToken = await UploadImageBytes(file);
            var newMediaItem = new UploadImage()
            {
                Description = string.Empty,
                SimpleMediaItem = new SimpleMedia()
                {
                    FileName = Guid.NewGuid().ToString(),
                    UploadToken = uploadToken,
                }
            };

            var newMediaItems = new List<UploadImage>() { newMediaItem };
            string jsonString = JsonSerializer.Serialize(new { newMediaItems, albumId });

            using (var request = new HttpRequestMessage(HttpMethod.Post, GoogleApiConstants.EndPoint.UPLOAD_IMAGE))
            {
                request.Content = new StringContent(jsonString, Encoding.UTF8, GoogleApiConstants.JSON_TYPE);

                var response = await _client.SendAsync(request);
                var apiContent = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<ImageCreateResponse[]>
                                        (JObject.Parse(apiContent)[GoogleApiConstants.NEW_MEDIA_PROP_JSON].ToString());
                return data[0];
            }

            return new ImageCreateResponse();
        }

        #endregion

        #region Private method

        /// <summary>
        /// Upload byte image to get upload token
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        private async Task<string> UploadImageBytes(IFormFile file)
        {
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

            using (var request = new HttpRequestMessage(HttpMethod.Post, GoogleApiConstants.EndPoint.UPLOAD_IMAGE_BYTES))
            {
                request.Content = new ByteArrayContent(fileBytes);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue(GoogleApiConstants.MEDIA_TYPE);
                foreach (var header in headers)
                {
                    request.Headers.Add(header.name, header.value);
                }
                var rs = await _client.SendAsync(request);
                return await rs.Content.ReadAsStringAsync();
            }
        }

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
        /// <returns></returns>
        private string GetMimeType(string str) => TryGetMimeType(str, out var mimeType) ? mimeType : "application/octet-stream";

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
        #endregion
    }
}
