using System;
using Newtonsoft.Json;
using System.ComponentModel;

namespace TestMaker.Models
{
    [JsonObject(MemberSerialization.OptOut)]
    public class Result
    {
        public int Id { get; set; }        
        public string Text { get; set; }
        public string Notes { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }

        public int QuizId { get; set; }
    }
}