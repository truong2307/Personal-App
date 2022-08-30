using Microsoft.AspNetCore.Http;
using PersonalApp.Models.GooglePhoto;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public interface IGooglePhotoHelper
    {
        Task<ImageResponse> GetImageByIdAsync(string id);

        Task<ImageCreateResponse> UploadImageAsync(IFormFile file, string albumId);
    }
}
