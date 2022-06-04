namespace PersonalApp.DataAccess.Services.IdentityServices
{
    public interface IIdentityServices
    {
        string GetCurrentUserId();
        string GetCurrentUserRole();
        string GetCurrentUserName();
    }
}
