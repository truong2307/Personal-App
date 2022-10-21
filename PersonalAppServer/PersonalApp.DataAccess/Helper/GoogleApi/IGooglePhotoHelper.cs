using Microsoft.AspNetCore.Http;
using PersonalApp.Models.GooglePhoto;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public interface IGooglePhotoHelper
    {
        Task<GooglePhotoResult<ImageResponse>> GetImageByIdAsync(string id);

        Task<GooglePhotoResult<ListImageResponse>> GetImagesAsync(List<string> ids);

        Task<GooglePhotoResult<ImageCreateResponse>> UploadImageAsync(IFormFile file, string albumId);

        Task<GooglePhotoResult<AblumResponse>> CreateAlbum(string title);

        Task<GooglePhotoResult<string>> RemoveImage(string idImage, string albumId);

        Task<GooglePhotoResult<string>> LoginAsync(string code);
    }
}
