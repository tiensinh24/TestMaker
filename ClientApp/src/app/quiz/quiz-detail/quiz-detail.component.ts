import { Component, OnInit, Inject } from '@angular/core';
import { Quiz } from '../../_models/Quiz';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

      // create an empty object from the Quiz model
      this.quiz = <Quiz>{};

      let id = +this.activatedRoute.snapshot.params['id'];
      console.log(id);
      
      if (id) {
        let url = this.baseUrl + 'api/quiz/' + id;
        this.http.get<Quiz>(url).subscribe(result => {
          this.quiz = result;
        }, error => console.error(error));
      }
      else {
        console.log('Invalid Id: routing back to home...');
        this.router.navigate(['home']);
      }
    }

  ngOnInit() {
  }

}
