using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using TestMaker.Models;
using System.Collections.Generic;
using System.Linq;

namespace TestMaker.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        #region RESTful conventions methods
        /// <summary>
        /// Retrieve the Question with the given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Question</param>
        /// <returns>The Question with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented (yet)!");
        }

        /// <summary>
        /// Add a new Question to the Database
        /// </summary>
        /// <param name="question">The Question(model) containing the data to insert</param>
        [HttpPut]
        public IActionResult Put(Question question)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Edit the Question with the given {id}
        /// </summary>
        /// <param name="question">The Question(model) containing the data to update</param>
        public IActionResult Post(Question question)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete the Question with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Question</param>
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
        #endregion


        // GET api/question/all
        [HttpGet("All/{quizId}")]
        public IActionResult All(int quizId)
        {
            var sampleQuestions = new List<Question>();

            //add a first sample question
            sampleQuestions.Add(new Question()
            {
                Id = 1,
                QuizId = quizId,
                Text = "What do you value most in your life?",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            });

            // add a bunch of other sample questions
            for (int i = 2; i <= 5; i++)
            {
                sampleQuestions.Add(new Question()
                {
                    Id = i,
                    QuizId = quizId,
                    Text = String.Format("Sample Question {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            // output the result in JSON format
            return new JsonResult(
                sampleQuestions,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }
    }
}