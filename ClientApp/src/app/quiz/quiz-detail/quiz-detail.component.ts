import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from '../../_models/Quiz';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit() {
  }

}
