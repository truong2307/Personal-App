using Microsoft.Extensions.Configuration;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GraphMS;
using System.Net;
using System.Text.Json;

namespace PersonalApp.DataAccess.Helper.OneDriveHandler
{
    public class GraphHelper : IGraphHelper
    {
        public IHttpClientFactory _httpClient { get; set; }
        private readonly IConfiguration _configuration;

        public GraphHelper(IHttpClientFactory httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        //public async Task 

        public async Task<GraphResponseRefreshToken> ResfreshAccessToken()
        {
            var graphInfo = _configuration.GetSection("GraphAPI");
            var client = _httpClient.CreateClient("quizzApp");
            var message = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(GraphEndPoint.Auth),
                Content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    [CommonConstants.GraphParam.GRANT_TYPE] = graphInfo.GetSection("GrantType").Value,
                    [CommonConstants.GraphParam.CLIENT_ID] = graphInfo.GetSection("ClientId").Value,
                    [CommonConstants.GraphParam.CLIENT_SECRET] = graphInfo.GetSection("ClientSecret").Value,
                    [CommonConstants.GraphParam.REFRESH_TOKEN] = graphInfo.GetSection("RefreshToken").Value
                })
            };
            var apiResponse = await client.SendAsync(message);

            if (apiResponse.StatusCode == HttpStatusCode.OK)
            {
                var apiContent = await apiResponse.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<GraphResponseRefreshToken>(apiContent);
            }

            return new GraphResponseRefreshToken();
        }
    }
}
