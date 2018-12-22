using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using TestMaker.Models;
using System.Collections.Generic;
using System.Linq;


namespace TestMaker.Controllers
{
    [Route("api/[controller]")]
    public class ResultController : Controller
    {
        #region RESTful conventions methods
        /// <summary>
        /// Retrieve the Result with the given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Result</param>
        /// <returns>The Result with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented (yet)!");
        }

        /// <summary>
        /// Add a new Result to the Database
        /// </summary>
        /// <param name="result">The Result(model) containing the data to insert</param>
        [HttpPut]
        public IActionResult Put(Result result)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Edit the Result with the given {id}
        /// </summary>
        /// <param name="result">The Result(model) containing the data to update</param>
        public IActionResult Post(Result result)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete the Result with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Result</param>
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
        #endregion


        // GET api/question/all
        [HttpGet("All/{quizId}")]
        public IActionResult All(int quizId)
        {
            var sampleResults = new List<Result>();

            // add a first sample result
            sampleResults.Add(new Result()
            {
                Id = 1,
                QuizId = quizId,
                Text = "What do you value most in your life?",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            });

            // add a bunch of other sample results
            for (int i = 2; i <= 5; i++)
            {
                sampleResults.Add(new Result()
                {
                    Id = i,
                    QuizId = quizId,
                    Text = String.Format("Sample Question {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            // output the result to JSON format
            return new JsonResult(
                sampleResults,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }

    }
}