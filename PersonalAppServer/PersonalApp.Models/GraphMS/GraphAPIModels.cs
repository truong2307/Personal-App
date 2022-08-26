using System.Text.Json.Serialization;

namespace PersonalApp.Models.GraphMS
{
    public class GraphResponseRefreshToken
    {
        [JsonPropertyName("token_type")]
        public string TokenType { get; set; }

        [JsonPropertyName("scope")]
        public string Scope { get; set; }

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonPropertyName("ext_expires_in")]
        public int ExtExpiresIn { get; set; }

        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        [JsonPropertyName("refresh_token")]
        public string RefreshToken { get; set; }
    }

    public class GraphResponseImage
    {
        [JsonPropertyName("height")]
        public int Heigth { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("width")]
        public int Width { get; set; }

    }
}
