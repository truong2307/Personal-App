using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;
using Microsoft.Extensions.Configuration;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GooglePhoto;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public class GooglePhotoHelper :IGooglePhotoHelper 
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

        public async Task<ImageResponse> GetImageWithId(string id)
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

        #endregion

        #region Private method

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

        private async Task RefreshAccessToken()
        {
            await UserCredential.RefreshTokenAsync(CancellationToken.None);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(UserCredential.Token.TokenType, UserCredential.Token.AccessToken);
        }

        #endregion
    }
}
