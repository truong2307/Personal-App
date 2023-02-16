# This project is pending, it being refactor
# Quizz app

Angular for client
.NET for server
---------------------------------------------------------------

## I. About handler [Google photo API](https://github.com/truong2307/Quizz-App/blob/master/PersonalAppServer/PersonalApp.DataAccess/Helper/GoogleApi/GooglePhotoHelper.cs)
### **_NOTE:_** ***All information about google photo api is private, don't public (ClientId, ClientSecret, [file](https://github.com/truong2307/Quizz-App/blob/master/PersonalAppServer/PersonalApp.API/Google.Apis.Auth.OAuth2.Responses.TokenResponse-truongnv), etc...)***

> Server is using google photo to store all image of system (avatar user, image of quizz, etc...)

<details><summary> Server is using class GoogleWebAuthorizationBroker to authorize</summary>
<p>

```cs
   var scopes = new List<string>()
            {
               GoogleApiConstants.Scope.READ_ONLY,
               GoogleApiConstants.Scope.APPEND_ONLY,
               GoogleApiConstants.Scope.APP_CREATED_DATA,
               GoogleApiConstants.Scope.ACCESS,
            };
            var googleInfo = _configuration.GetSection("GoogleApi");
            var clientId = googleInfo.GetSection("ClientId").Value;
            var clientSecret = googleInfo.GetSection("ClientSecret").Value;
            var user = googleInfo.GetSection("UserName").Value;
            var secrets = new ClientSecrets { ClientId = clientId, ClientSecret = clientSecret };
            
            UserCredential = await GoogleWebAuthorizationBroker.AuthorizeAsync(secrets,
                                                                                    scopes,
                                                                                    user,
                                                                                    CancellationToken.None,
                                                                                    new FileDataStore(Directory.GetCurrentDirectory(), true),
                                                                                    new CustomReceiveCode(Code));
```

</p>
</details>

- Make sure create [file](https://github.com/truong2307/Quizz-App/blob/master/PersonalAppServer/PersonalApp.API/Google.Apis.Auth.OAuth2.Responses.TokenResponse-truongnv) ``` Google.Apis.Auth.OAuth2.Responses.TokenResponse-{nameUser} ``` with function LoginAsync(string code) in debug mode

- The code get with url ``` https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&response_type=code&client_id={client_id}&redirect_uri=http%3A%2F%2Flocalhost%2Fauthorize&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fphotoslibrary.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fphotoslibrary.appendonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fphotoslibrary.readonly.appcreateddata%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fphotoslibrary ```

- Before use API google photo, make sure check authorize wiht function ``` IsErrorAuthorization ```

<details><summary>When access token is expried, system auto refresh new access token</summary>
<p>

```cs
   if (UserCredential.Token.IsExpired(UserCredential.Flow.Clock))
      {
          await UserCredential.RefreshTokenAsync(CancellationToken.None);
      }
```
</p>
</details>
