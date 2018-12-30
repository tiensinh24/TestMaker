using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TestMaker.Data;
using TestMaker.Data.Models;
using TestMaker.ViewModels;

namespace TestMaker.Controllers
{
    public class TokenController : BaseApiController
    {
        #region Private Members            
        #endregion

        #region Constructor
        public TokenController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
            ) : base(context, roleManager, userManager, configuration) { }
        #endregion

        [HttpPost("Auth")]
        public async Task<IActionResult> Jwt([FromBody]TokenRequestViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            //  if the client payload is invalid.
            if (model == null)
                return new StatusCodeResult(500);

            switch (model.grant_type)
            {
                case "password":
                    return await GetToken(model);
                default:
                    // not supported - return a HTTP 401 (Unauthorized)
                    return new UnauthorizedResult();
            }
        }

        private async Task<IActionResult> GetToken(TokenRequestViewModel model)
        {
            try
            {
                // check if there's an user with the given username
                var user = await _userManager.FindByNameAsync(model.username);
                // fallback to support email address instead of username
                if (user == null || model.username.Contains("@"))
                    user = await _userManager.FindByEmailAsync(model.username);

                if (user == null || !await _userManager.CheckPasswordAsync(user, model.password))
                    // user doesn't exist or password mismatch
                    return new UnauthorizedResult();

                // username & password match: create and return the Jwt token

                DateTime now = DateTime.UtcNow;

                // add the registered claims for JWT (RFC7519).
                // For more info, see https://tools.ietf.org/html/rfc7519#section-4.1
                var claims = new [] {
                    new Claim (JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim (JwtRegisteredClaimNames.Iat,
                        new DateTimeOffset(now).ToUnixTimeSeconds().ToString())

                    // TODO: add additional claims here
                };

                var tokenExpirationMins = 
                    _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["Auth:Jwt:Issuer"],
                    audience: _configuration["Auth:Jwt:audience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                    signingCredentials: new SigningCredentials(
                        issuerSigningKey, SecurityAlgorithms.HmacSha256)
                );

                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                // build & return the response
                var response = new TokenResponseViewModel()
                {
                    token = encodedToken,
                    expiration = tokenExpirationMins
                };
                return Json(response);
            }
            catch (System.Exception)
            {
                return new UnauthorizedResult();
            }
        }
    }
}