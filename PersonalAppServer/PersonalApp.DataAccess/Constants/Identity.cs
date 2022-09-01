namespace PersonalApp.DataAccess.Constants
{
    public static class Identity
    {
        public class Role
        {
            public const string ADMIN_ROLE = "Admin";
            public const string USER_ROLE = "User";
            public const string MANAGER_ROLE = "Manager";
        }

        public static class ClaimTypeUser
        {
            public const string TYPE_NAME = "name";
            public const string TYPE_USERID = "userId";
            public const string TYPE_ROLE = "role";
        }
    }
}
