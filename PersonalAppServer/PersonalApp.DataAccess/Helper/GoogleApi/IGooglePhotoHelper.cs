using PersonalApp.Models.GooglePhoto;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public interface IGooglePhotoHelper
    {
        Task<ImageResponse> GetImageWithId(string id);
    }
}
