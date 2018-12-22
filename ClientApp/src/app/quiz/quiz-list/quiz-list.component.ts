import { Component, OnInit, Inject, Input } from '@angular/core';
import { Quiz } from '../../_models/Quiz';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  @Input() class: string;
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];


  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {}
  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log('Quiz with Id ' + this.selectedQuiz.Id + ' has been selected.');
  }

  ngOnInit() {
    let url = this.baseUrl + 'api/quiz/';

      switch (this.class) {
        case 'latest':
        default:
          this.title = 'Latest Quizzes';
          url += 'Latest/';
          break;
        case 'byTitle':
          this.title = 'Quizzes by Title';
          url += 'ByTitle/';
          break;
        case 'random':
          this.title = 'Random Quizzes';
          url += 'Random/';
          break;
      }

      this.http.get<Quiz[]>(url).subscribe(result => {
        this.quizzes = result;
      }, error => {
        console.log(error);
      });
  }

}
