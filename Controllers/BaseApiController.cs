using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using TestMaker.Data;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TestMaker.Data.Models;

namespace TestMaker.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {        
        #region Constructor
        public BaseApiController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            // Instantiate the required classes through DI
            this._context = context;
            this._roleManager = roleManager;
            this._userManager = userManager;
            this._configuration = configuration;


            // Instantiate a single JsonSerializerSettings object
            // that can be reused multiple times.
            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };

        }
        #endregion

        #region Shared Properties
        protected ApplicationDbContext _context { get; private set; }
        protected RoleManager<IdentityRole> _roleManager { get; private set; }
        protected UserManager<ApplicationUser> _userManager { get; private set; }
        protected IConfiguration _configuration { get; private set; }
        protected JsonSerializerSettings JsonSettings { get; private set; }
        #endregion
    }
}
