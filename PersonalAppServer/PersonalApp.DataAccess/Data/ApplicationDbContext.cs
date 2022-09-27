using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApiUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<QuizzTopic> QuizzTopics { get; set; }
        public DbSet<QuizzTest> QuizzTests { get; set; }
        public DbSet<QuizzMultiplechoiceQuestion> QuizzMultiplechoiceQuestions { get; set; }
        public DbSet<QuizzEssayQuestion> QuizzEssayQuestions { get; set; }
        public DbSet<QuizzUser> QuizzUsers { get; set; }
        public DbSet<QuizzUserMark> QuizzUserMarks { get; set; }
        public DbSet<QuizzUserAnswer> QuizzUserAnswers { get; set; }
        public DbSet<GoogleAlbumImage> GoogleAlbumImages { get; set; }
        public DbSet<GoogleImage> GoogleImages { get; set; }
    }
}
