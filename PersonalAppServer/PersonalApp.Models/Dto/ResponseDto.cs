namespace PersonalApp.Models.Dto
{
    public class ResponseDto
    {
        public bool IsSuccess { get; set; } = false;
        public object Result { get; set; }
        public string ErrorMessages { get; set; } = "";
    }

    public class ResponseDatas<T> where T : class
    {
        public bool IsSuccess { get; set; } = false;
        public List<T> Datas { get; set; }
        public string ErrorMessages { get; set; } = "";
        public int? TotalItem { get; set; }
    }

}
