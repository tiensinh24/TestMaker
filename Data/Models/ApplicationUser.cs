using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TestMaker.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        #region
        public ApplicationUser()
        {

        }
        #endregion

        #region Properties
        // Already exist in IdentityUser
        // [Key]
        // [Required]
        // public string Id { get; set; }
        // [Required]
        // [MaxLength(128)]
        // public string UserName { get; set; }
        // [Required]
        // public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Notes { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        #region Lazy-Load Properties
        public virtual List<Quiz> Quizzes { get; set; }
        #endregion        
        #endregion
    }
}