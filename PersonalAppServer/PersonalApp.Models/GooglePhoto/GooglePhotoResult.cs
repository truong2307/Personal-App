namespace PersonalApp.Models.GooglePhoto
{
    public class GooglePhotoResult<T> where T : class
    {
        public T Result { get; set; }

        public bool IsSuccess { get; set; }

        public string ErrorMessage { get; set; }

        public GooglePhotoResult()
        {
            IsSuccess = false;
            ErrorMessage = string.Empty;
        }
    }
}
