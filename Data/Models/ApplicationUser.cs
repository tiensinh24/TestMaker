using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestMaker.Data.Models
{
    public class ApplicationUser
    {
        #region
        public ApplicationUser()
        {

        }
        #endregion

        #region Properties
        [Key]
        [Required]
        public string Id { get; set; }
        [Required]
        [MaxLength(128)]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
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