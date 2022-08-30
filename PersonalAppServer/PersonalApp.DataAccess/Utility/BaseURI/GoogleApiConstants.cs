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
        }

    }
}
