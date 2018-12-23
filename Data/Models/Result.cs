using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestMaker.Data.Models
{
    public class Result
    {
        #region Constructor
        public Result()
        {
        }
        #endregion
        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public string Notes { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        [Required]
        public int QuizId { get; set; }

        #region Lazy-Load Properties
        [ForeignKey("QuizId")]
        public virtual Quiz Quiz { get; set; }
        #endregion

        #endregion
    }
}