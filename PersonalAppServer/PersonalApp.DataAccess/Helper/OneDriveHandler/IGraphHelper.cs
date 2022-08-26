using PersonalApp.Models.GraphMS;

namespace PersonalApp.DataAccess.Helper.OneDriveHandler
{
    public interface IGraphHelper
    {
        Task<GraphResponseRefreshToken> ResfreshAccessToken();
    }
}
