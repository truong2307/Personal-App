using Microsoft.AspNetCore.Http;
using PersonalApp.Models.GooglePhoto;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public interface IGooglePhotoHelper
    {
        Task<GooglePhotoResult<ImageResponse>> GetImageByIdAsync(string id);

        Task<GooglePhotoResult<ImageCreateResponse>> UploadImageAsync(IFormFile file, string albumId);
    }
}
