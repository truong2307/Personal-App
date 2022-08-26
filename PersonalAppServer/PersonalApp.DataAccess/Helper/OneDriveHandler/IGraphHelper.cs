using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.GraphMS;

namespace PersonalApp.DataAccess.Helper.OneDriveHandler
{
    public interface IGraphHelper
    {
        Task<GraphResponseRefreshToken> ResfreshAccessToken();

        Task<GraphResponseImage> GetImageWithId(string accessToken, string id, GraphApiConstant.SizeImage size);

        Task UploadFileToDrive(string accessToken);

    }
}
