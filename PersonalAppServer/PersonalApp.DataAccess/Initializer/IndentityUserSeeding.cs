using Microsoft.AspNetCore.Identity;
using PersonalApp.DataAccess.Constants;
using PersonalApp.DataAccess.Data;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Initializer
{
    public class IndentityUserSeeding
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApiUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public IndentityUserSeeding(ApplicationDbContext context, UserManager<ApiUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }
        public async Task Initialize()
        {
            string[] roles = new string[] { Role.ADMIN_ROLE, Role.USER_ROLE, Role.MANAGER_ROLE };

            foreach (string role in roles)
            {
                var roleInDb = _context.Roles.FirstOrDefault(c => c.Name == role);

                if (roleInDb == null)
                {
                    await _roleManager.CreateAsync(new ApplicationRole()
                    {
                        Name = role,
                        Id = Guid.NewGuid().ToString(),
                    });
                }
            }

            var user = new ApiUser
            {
                FullName = "Nguyen Van Truong",
                Email = "admin@mail.com",
                NormalizedEmail = "ADMIN@MAIL.COM",
                UserName = "truongnv",
                NormalizedUserName = "TRUONGNV",
                PhoneNumber = "+111111111111",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };

            var userInDb = _context.Users.FirstOrDefault(c => c.UserName == user.UserName);

            if (userInDb == null)
            {
                await _userManager.CreateAsync(user, "@Abc123");
                await _userManager.AddToRoleAsync(user, Role.ADMIN_ROLE);
            }
        }
    }
}
