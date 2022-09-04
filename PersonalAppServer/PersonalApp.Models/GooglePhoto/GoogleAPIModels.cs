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

    public class UploadImage
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("simpleMediaItem")]
        public SimpleMedia SimpleMediaItem { get; set; }

        public class SimpleMedia
        {
            [JsonPropertyName("fileName")]
            public string FileName { get; set; }

            [JsonPropertyName("uploadToken")]
            public string UploadToken { get; set; }
        }
    }

    public class Album
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }
    }

    public class AblumResponse 
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("productUrl")]
        public string ProductUrl { get; set; }

        [JsonPropertyName("isWriteable")]
        public bool IsWriteable { get; set; }
    }

    public class ImageCreateResponse
    {
        [JsonPropertyName("uploadToken")]
        public string UploadToken { get; set; }

        [JsonPropertyName("mediaItem")]
        public MediaItem MediaItem { get; set; }
    }

    public class MediaItem
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("productUrl")]
        public string ProductUrl { get; set; }

        [JsonPropertyName("mimeType")]
        public string MimeType { get; set; }

        [JsonPropertyName("filename")]
        public string Filename { get; set; }
    }

}
