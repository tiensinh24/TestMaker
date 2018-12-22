using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using TestMaker.Models;
using System.Collections.Generic;
using System.Linq;

namespace TestMaker.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : Controller
    {
        #region RESTful conventions methods
        /// <summary>
        /// GET: api/quiz/{}id
        /// Retrieve the Quiz with the given {id}
        /// </summary>
        /// <param name="id">The Id of an existing Quiz</param>
        /// <returns>The Quiz with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // create a sample quiz to match a given request
            var v = new Quiz()
            {
                Id = id,
                Title = String.Format("Sample quiz with id {0}", id),
                Description = "Not a real quiz: it's just a sample!",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            };

            // output the result to JSON format
            return new JsonResult(
                v,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }
        
        /// <summary>
        /// Add a new Quiz to the Database
        /// </summary>
        /// <param name="quiz">The Quiz(model) containing the data to insert</param>
        [HttpPut]
        public IActionResult Put(Quiz quiz)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Edit the Quiz with the given {id}
        /// </summary>
        /// <param name="quiz">The Quiz(model) containing the data to update</param>
        public IActionResult Post(Quiz quiz)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete the Quiz with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Quiz</param>
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
        #endregion

        
        #region  Attribute-based routing methods
        /// <summary>
        /// GET: api/quiz/latest
        /// Retrieve the {num} latest Quizzes
        /// </summary>
        /// <param name="num">The number of quizzes to retrieve</param>
        /// <returns>The {num} latest Quizzes</returns>
        [HttpGet("Latest/{num:int?}")]
        public IActionResult Latest(int num = 10)
        {
            var sampleQuizzes = new List<Quiz>();

            // add a first sample quiz
            sampleQuizzes.Add(new Quiz()
            {
                Id = 1,
                Title = "Which Shingeki No Kyojin character are you?",
                Description = "Anime-related personality test",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            });

            // add a bunch of other sample quizzes
            for (int i = 2; i <= num; i++)
            {
                sampleQuizzes.Add(new Quiz()
                {
                    Id = i,
                    Title = String.Format("Sample Quiz {0}", i),
                    Description = "This is a sample quiz",
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            // output the result in JSON format
            return new JsonResult(
                sampleQuizzes,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }
        #endregion

        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 10)
        {
            var sampleQuizzes = ((JsonResult)Latest(num)).Value as List<Quiz>;

            return new JsonResult(
                sampleQuizzes.OrderBy(s => s.Title),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }

        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 10)
        {
            var sampleQuizzes = ((JsonResult)Latest(num)).Value as List<Quiz>;

            return new JsonResult(
                sampleQuizzes.OrderBy(s => Guid.NewGuid()),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                }
            );
        }
    }
}