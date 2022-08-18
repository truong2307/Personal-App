namespace PersonalApp.Models.Dto
{
    public class ResponseDto
    {
        public bool IsSuccess { get; set; }

        public object Result { get; set; }

        public string ErrorMessages { get; set; }

        public ResponseDto()
        {
            IsSuccess = false;
            ErrorMessages = string.Empty;
        }
    }

    public class ResponseDatas<T> where T : class
    {
        public bool IsSuccess { get; set; }

        public List<T> Datas { get; set; }

        public string ErrorMessages { get; set; }

        public int? TotalItem { get; set; }

        public ResponseDatas()
        {
            IsSuccess = false;
            ErrorMessages = string.Empty;
        }
    }
}
