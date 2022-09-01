using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using PersonalApp.DataAccess.Services.ClaimUserServices;

namespace PersonalApp.DataAccess.Utility.Hubs
{
    [Authorize]
    public class UserHub : Hub
    {
        private readonly IClaimUserServices _claimUserServices;
        public static int TotalUsers { get; set; } = 0;
        public UserHub(IClaimUserServices claimUserServices)
        {
            _claimUserServices = claimUserServices;
        }

        public override async Task OnConnectedAsync()
        {
            var userName = _claimUserServices.GetCurrentUserName();
            await Groups.AddToGroupAsync(Context.ConnectionId, userName);

            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
