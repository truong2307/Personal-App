namespace PersonalApp.DataAccess.Utility.BaseURI
{
    public class GraphApiConstant
    {
        public class EndPoint
        {
            public const string AUTH = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

            /// <summary>
            /// {0} is folder, {1} is file name
            /// </summary>
            public const string UPLOAD_IMAGE = "https://graph.microsoft.com/v1.0/me/drive/root:/{0}/{1}.png:/content";

            /// <summary>
            /// {0} = {item-id}, {1} = {thumb-id}, {2} = {size}
            /// </summary>
            public const string SINGLE_THUMBNAIL = "https://graph.microsoft.com/v1.0/me/drive/items/{0}/thumbnails/{1}/{2}";
        }

        public enum SizeImage
        {
            Large,
            Medium,
            Small
        }

    }
}
