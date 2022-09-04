using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Requests;
using Google.Apis.Auth.OAuth2.Responses;

namespace PersonalApp.DataAccess.Helper.GoogleApi
{
    public class CustomReceiveCode : ICodeReceiver
    {
        private readonly string _code;
        public string RedirectUri
        {
            get { return "http://localhost/authorize"; }
        }

        public CustomReceiveCode(string code)
        {
            _code = code.Replace("%2F", "/");
        }

        public Task<AuthorizationCodeResponseUrl> ReceiveCodeAsync(AuthorizationCodeRequestUrl url, CancellationToken taskCancellationToken)
        {
            return Task.FromResult(new AuthorizationCodeResponseUrl
            {
                Code = _code,
            });
        }
    }
}
