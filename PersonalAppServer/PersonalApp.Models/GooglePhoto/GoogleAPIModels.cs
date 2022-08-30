using System.Text.Json.Serialization;

namespace PersonalApp.Models.GooglePhoto
{
    public class ImageResponse
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("productUrl")]
        public string ProductUrl { get; set; }

        [JsonPropertyName("baseUrl")]
        public string BaseUrl { get; set; }

        [JsonPropertyName("mimeType")]
        public string MimeType { get; set; }

        [JsonPropertyName("filename")]
        public string Filename { get; set; }
    }
}
