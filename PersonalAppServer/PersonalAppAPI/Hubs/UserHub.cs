using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PersonalAppAPI.Hubs
{
    [Authorize]
    public class UserHub : Hub
    {
        public static int TotalVisited { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindowLoaded(string name)
        {
            TotalVisited++;
            //send update to all clients that total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalVisited);
            return $"total views from {name} - {TotalVisited}";
        }
    }
}
