using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using TestMaker.Models;
using System.Collections.Generic;
using System.Linq;

namespace TestMaker.Controllers
{
    [Route("api/[controller]")]
    public class AnswerController : Controller
    {
        #region RESTful conventions methods
        /// <summary>
        /// Retrieve the Answer with the given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Answer</param>
        /// <returns>The Answer with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented (yet)!");
        }

        /// <summary>
        /// Add a new Answer to the Database
        /// </summary>
        /// <param name="answer">The Answer(model) containing the data to insert</param>
        [HttpPut]
        public IActionResult Put(Answer answer)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Edit the Answer with the given {id}
        /// </summary>
        /// <param name="answer">The Answer(model) containing the data to update</param>
        public IActionResult Post(Answer answer)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete the Answer with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Answer</param>
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
        #endregion


        // GET api/answer/all
        [HttpGet("All/{questionId}")]
        public IActionResult All(int questionId)
        {
            var sampleAnswers = new List<Answer>();

            // add a first sample answer
            sampleAnswers.Add(new Answer()
            {
                Id = 1,
                QuestionId = questionId,
                Text = "Friends and family",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            });

            // add a bunch of other sample answers
            for (int i = 2; i <= 5; i++)
            {
                sampleAnswers.Add(new Answer()
                {
                    Id = i,
                    QuestionId = questionId,
                    Text = String.Format("Sample Answer {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            // output the result in JSON format
            return new JsonResult(
                sampleAnswers,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }
    

    }
}