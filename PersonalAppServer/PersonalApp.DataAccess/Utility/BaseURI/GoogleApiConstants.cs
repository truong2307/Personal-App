namespace PersonalApp.DataAccess.Utility.BaseURI
{
    public class GoogleApiConstants
    {
        public class Scope
        {
            public const string READ_ONLY = "https://www.googleapis.com/auth/photoslibrary.readonly";
            public const string APPEND_ONLY = "https://www.googleapis.com/auth/photoslibrary.appendonly";
            public const string APP_CREATED_DATA = "https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata";
        }

        public class EndPoint
        {
            /// <summary>
            /// {0} is image id
            /// </summary>
            public const string GET_IMAGE_BY_ID = "https://photoslibrary.googleapis.com/v1/mediaItems/{0}";
            public const string UPLOAD_IMAGE_BYTES = "https://photoslibrary.googleapis.com/v1/uploads";
            public const string UPLOAD_IMAGE = "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate";
            public const string CREATE_ALBUM = "https://photoslibrary.googleapis.com/v1/albums";
        }

        public const string NEW_MEDIA_PROP_JSON = "newMediaItemResults";

        //Header
        public const string X_GOOG_UPLOAD_CONTENT_TYPE = "X-Goog-Upload-Content-Type";
        public const string X_GOOG_UPLOAD_PROTOCOL = "X-Goog-Upload-Protocol";
        public const string MEDIA_TYPE = "application/octet-stream";
        public const string JSON_TYPE = "application/json";

        //Format Image
        public static readonly HashSet<string> AcceptedMimeTypesImage = new(StringComparer.OrdinalIgnoreCase)
        {
            { "image/bmp" },
            { "image/gif" },
            { "image/heic" },
            { "image/vnd.microsoft.icon" },
            { "image/jpeg" },
            { "image/jpeg" },
            { "image/png" },
            { "image/tiff" },
            { "image/webp" },
        };

        public static IDictionary<string, string> BuildMappings()
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { ".apng", "image/apng" },
                { ".art", "image/x-jg" },
                { ".avci", "image/avci" },
                { ".avcs", "image/avcs" },
                { ".avif", "image/avif" },
                { ".avifs", "image/avif-sequence" },
                { ".bmp", "image/bmp" },
                { ".cmx", "image/x-cmx" },
                { ".cod", "image/cis-cod" },
                { ".dib", "image/bmp" },
                { ".emf", "image/emf" },
                { ".gif", "image/gif" },
                { ".heic", "image/heic" },
                { ".heics", "image/heic-sequence" },
                { ".heif", "image/heif" },
                { ".heifs", "image/heif-sequence" },
                { ".ico", "image/x-icon" },
                { ".ief", "image/ief" },
                { ".jfif", "image/pjpeg" },
                { ".jpe", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".jpg", "image/jpeg" },
                { ".mac", "image/x-macpaint" },
                { ".odi", "application/vnd.oasis.opendocument.image" },
                { ".pbm", "image/x-portable-bitmap" },
                { ".pct", "image/pict" },
                { ".pgm", "image/x-portable-graymap" },
                { ".pic", "image/pict" },
                { ".pict", "image/pict" },
                { ".png", "image/png" },
                { ".pnm", "image/x-portable-anymap" },
                { ".pnt", "image/x-macpaint" },
                { ".pntg", "image/x-macpaint" },
                { ".pnz", "image/png" },
                { ".ppm", "image/x-portable-pixmap" },
                { ".qti", "image/x-quicktime" },
                { ".qtif", "image/x-quicktime" },
                { ".ras", "image/x-cmu-raster" },
                { ".rf", "image/vnd.rn-realflash" },
                { ".rgb", "image/x-rgb" },
                { ".svg", "image/svg+xml" },
                { ".tif", "image/tiff" },
                { ".tiff", "image/tiff" },
                { ".wbmp", "image/vnd.wap.wbmp" },
                { ".wdp", "image/vnd.ms-photo" },
                { ".webp", "image/webp" },
                { ".xbm", "image/x-xbitmap" },
                { ".xpm", "image/x-xpixmap" },
                { ".xwd", "image/x-xwindowdump" },
                { "image/bmp", ".bmp" },
                { "image/jpeg", ".jpg" },
                { "image/pict", ".pic" },
                { "image/png", ".png" },
                { "image/x-png", ".png" },
                { "image/tiff", ".tiff" },
                { "image/x-macpaint", ".mac" },
                { "image/x-quicktime", ".qti" },

            };
            List<KeyValuePair<string, string>> list = dictionary.ToList();
            foreach (KeyValuePair<string, string> item in list)
            {
                if (!dictionary.ContainsKey(item.Value))
                {
                    dictionary.Add(item.Value, item.Key);
                }
            }

            return dictionary;
        }

    }
}
