using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using PersonalApp.DataAccess.Constants;
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

        private readonly ILogger<GooglePhotoHelper> _logger;

        private string _code;
        private string Code
        {
            get { return string.IsNullOrEmpty(_code) ? string.Empty : _code; }

            set { _code = value; }
        }

        private UserCredential UserCredential { get; set; }

        #endregion

        #region constructor

        public GooglePhotoHelper(IHttpClientFactory httpClient
            , IConfiguration configuration
            , ILogger<GooglePhotoHelper> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
            _client = _httpClient.CreateClient(GoogleApiConstants.APP_NAME);
        }

        #endregion

        #region override method

        public async Task<GooglePhotoResult<ListImageResponse>> GetImagesAsync(List<string> ids)
        {
            var result = new GooglePhotoResult<ListImageResponse>();
            if (await IsErrorAuthorization())
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_AUTHORIZE;
                return result;
            }

            var queryString = string.Join("&", ids.Select(c => string.Concat("mediaItemIds=",c)));
            var response = await _client.GetAsync(string.Format(GoogleApiConstants.EndPoint.GET_IMAGES, queryString));
            var apiContent = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                result.IsSuccess = true;
                result.Result = JsonSerializer.Deserialize<ListImageResponse>(apiContent);
            }
            else result.ErrorMessage = Message.GooglePhoto.ERROR_FETCH_IMAGE;

            return result;
        }

        public async Task<GooglePhotoResult<ImageResponse>> GetImageByIdAsync(string id)
        {
            var result = new GooglePhotoResult<ImageResponse>();
            if (await IsErrorAuthorization())
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_AUTHORIZE;
                return result;
            }

            var response = await _client.GetAsync(string.Format(GoogleApiConstants.EndPoint.GET_IMAGE_BY_ID, id));
            var apiContent = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                result.IsSuccess = true;
                result.Result = JsonSerializer.Deserialize<ImageResponse>(apiContent);
            }
            else result.ErrorMessage = Message.GooglePhoto.ERROR_FETCH_IMAGE;

            return result;
        }

        public async Task<GooglePhotoResult<string>> RemoveImage(string idImage, string albumId)
        {
            var result = new GooglePhotoResult<string>();
            if (await IsErrorAuthorization())
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_AUTHORIZE;
                return result;
            }

            string[] mediaItemIds = { idImage };
            var jsonString = JsonSerializer.Serialize(new { mediaItemIds });

            using var request = new HttpRequestMessage(HttpMethod.Post, string.Format(GoogleApiConstants.EndPoint.REMOVE_MEDIA_ITEM, albumId));

            request.Content = new StringContent(jsonString, Encoding.UTF8, GoogleApiConstants.JSON_TYPE);
            var response = await _client.SendAsync(request);
            var apiContent = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                result.IsSuccess = true;
                result.Result = apiContent;
            }
            else result.ErrorMessage = Message.GooglePhoto.ERROR_DELETE_ALBUM;

            return result;

        }

        public async Task<GooglePhotoResult<AblumResponse>> CreateAlbum(string title)
        {
            var result = new GooglePhotoResult<AblumResponse>();
            if (await IsErrorAuthorization())
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_AUTHORIZE;
                return result;
            }

            var album = new Album() { Title = title };
            string jsonString = JsonSerializer.Serialize(new { album });
            var Content = new StringContent(jsonString, Encoding.UTF8, GoogleApiConstants.JSON_TYPE);
            var response = await _client.PostAsync(GoogleApiConstants.EndPoint.CREATE_ALBUM, Content);
            var apiContent = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                result.IsSuccess = true;
                result.Result = JsonSerializer.Deserialize<AblumResponse>(apiContent);
            }
            else result.ErrorMessage = Message.GooglePhoto.ERROR_CREATED_ALBUM;

            return result;
        }

        public async Task<GooglePhotoResult<ImageCreateResponse>> UploadImageAsync(IFormFile file, string albumId)
        {
            var result = new GooglePhotoResult<ImageCreateResponse>();

            //Check authorize to use api
            if (await IsErrorAuthorization())
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_AUTHORIZE;
                return result;
            }

            //Check Uploading bytes
            var uploadToken = await UploadImageBytes(file);
            if (string.IsNullOrEmpty(uploadToken))
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_UPLOAD_IMAGE;
                return result;
            }

            // Creating a media item
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

            using var request = new HttpRequestMessage(HttpMethod.Post, GoogleApiConstants.EndPoint.UPLOAD_IMAGE);
            request.Content = new StringContent(jsonString, Encoding.UTF8, GoogleApiConstants.JSON_TYPE);
            var response = await _client.SendAsync(request);
            var apiContent = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var data = JsonSerializer.Deserialize<ImageCreateResponse[]>
                        (JObject.Parse(apiContent)[GoogleApiConstants.PropJsonName.NEW_MEDIA_ITEM_RESULTS].ToString());
                result.IsSuccess = true;
                result.Result = data[0];
            }
            else
            {
                result.ErrorMessage = Message.GooglePhoto.ERROR_UPLOAD_IMAGE;
                _logger.LogError(apiContent);
            }

            return result;
        }

        public async Task<GooglePhotoResult<string>> LoginAsync(string code)
        {
            var result = new GooglePhotoResult<string>();

            Code = code;
            var scopes = new List<string>()
            {
               GoogleApiConstants.Scope.READ_ONLY,
               GoogleApiConstants.Scope.APPEND_ONLY,
               GoogleApiConstants.Scope.APP_CREATED_DATA,
               GoogleApiConstants.Scope.ACCESS,
            };
            var googleInfo = _configuration.GetSection("GoogleApi");
            var clientId = googleInfo.GetSection("ClientId").Value;
            var clientSecret = googleInfo.GetSection("ClientSecret").Value;
            var user = googleInfo.GetSection("UserName").Value;
            var secrets = new ClientSecrets { ClientId = clientId, ClientSecret = clientSecret };

            try
            {
                UserCredential = await GoogleWebAuthorizationBroker.AuthorizeAsync(secrets,
                                                                                    scopes,
                                                                                    user,
                                                                                    CancellationToken.None,
                                                                                    new FileDataStore(Directory.GetCurrentDirectory(), true),
                                                                                    new CustomReceiveCode(Code));
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(UserCredential.Token.TokenType, UserCredential.Token.AccessToken);
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                result.ErrorMessage = ex.ToString();
            }

            return result;
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

            using var request = new HttpRequestMessage(HttpMethod.Post, GoogleApiConstants.EndPoint.UPLOAD_IMAGE_BYTES);
            request.Content = new ByteArrayContent(fileBytes);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue(GoogleApiConstants.MEDIA_TYPE);
            foreach (var (name, value) in headers)
            {
                request.Headers.Add(name, value);
            }
            var rs = await _client.SendAsync(request);
            if (rs.StatusCode == HttpStatusCode.OK) return await rs.Content.ReadAsStringAsync();
            return string.Empty;
        }

        /// <summary>
        /// Check author
        /// </summary>
        /// <returns></returns>
        private async Task<bool> IsErrorAuthorization()
        {
            _logger.LogInformation("Checking Authorization google...");
            if (UserCredential is null)
            {
                var rs = await LoginAsync(Code);
                if (!rs.IsSuccess) return true;
            }

            if (UserCredential.Token.IsExpired(UserCredential.Flow.Clock))
            {
                if (await IsErrorRefreshAccessToken()) return true;
            }

            return false;
        }

        /// <summary>
        /// refresh access token when expried
        /// </summary>
        /// <returns></returns>
        private async Task<bool> IsErrorRefreshAccessToken()
        {
            try
            {
                _logger.LogInformation("Refreshing token...");
                await UserCredential.RefreshTokenAsync(CancellationToken.None);
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(UserCredential.Token.TokenType, UserCredential.Token.AccessToken);
                _logger.LogInformation("Refresh token done");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError("Refresh token error");
                _logger.LogError(ex.ToString());
                return true;
            }
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
        private string GetMimeType(string str) => TryGetMimeType(str, out var mimeType) ? mimeType : GoogleApiConstants.MEDIA_TYPE;

        public bool TryGetMimeType(string str, out string mimeType)
        {
            mimeType = string.Empty;
            var _mappings = new Lazy<IDictionary<string, string>>(GoogleApiConstants.BuildMappings);
            if (str == null) return false;

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
