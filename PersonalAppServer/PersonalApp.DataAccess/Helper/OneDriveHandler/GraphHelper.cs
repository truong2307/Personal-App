using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Converters;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GraphMS;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;

namespace PersonalApp.DataAccess.Helper.OneDriveHandler
{
    public class GraphHelper : IGraphHelper
    {
        public IHttpClientFactory _httpClient { get; set; }
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GraphHelper(IHttpClientFactory httpClient
            , IConfiguration configuration
            , IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task UploadFileToDrive(string accessToken)
        {
            var formCollection = await _httpContextAccessor.HttpContext.Request.ReadFormAsync();
            var file = formCollection.Files.First();
            byte[] fileBytes = { };

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
                // act on the Base64 data
            }

            var client = _httpClient.CreateClient("quizzApp");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var byteContent = new ByteArrayContent(fileBytes);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("image/png");
            var message = new HttpRequestMessage()
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri(string.Format(GraphApiConstant.EndPoint.UPLOAD_IMAGE, "image" , Guid.NewGuid())),
                Content = byteContent,
            };

            //Send it
            var response = await client.SendAsync(message);
            var apiContent = await response.Content.ReadAsStringAsync();
        }

        public async Task<GraphResponseImage> GetImageWithId(string accessToken, string idItem, GraphApiConstant.SizeImage size)
        {
            var client = _httpClient.CreateClient("quizzApp");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var uriFormat = string.Format(GraphApiConstant.EndPoint.SINGLE_THUMBNAIL, idItem, 0, size.ToString()); 

            var message = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(uriFormat),
            };

            var apiResponse = await client.SendAsync(message);

            if (apiResponse.StatusCode == HttpStatusCode.OK)
            {
                var apiContent = await apiResponse.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<GraphResponseImage>(apiContent);
            }

            return new GraphResponseImage();
        }

        public async Task<GraphResponseRefreshToken> ResfreshAccessToken()
        {
            var graphInfo = _configuration.GetSection("GraphAPI");
            var client = _httpClient.CreateClient("quizzApp");
            var message = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(GraphApiConstant.EndPoint.AUTH),
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
