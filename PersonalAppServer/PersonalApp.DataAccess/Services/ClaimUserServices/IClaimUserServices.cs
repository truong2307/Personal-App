namespace PersonalApp.DataAccess.Services.ClaimUserServices
{
    public interface IClaimUserServices
    {
        string GetCurrentUserId();
        string GetCurrentUserRole();
        string GetCurrentUserName();
    }
}
