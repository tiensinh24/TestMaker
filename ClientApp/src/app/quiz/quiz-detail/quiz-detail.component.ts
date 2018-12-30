import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-quiz-detail',
    templateUrl: './quiz-detail.component.html',
    styleUrls: ['./quiz-detail.component.css']
})

export class QuizDetailComponent {
    quiz: Quiz;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        public auth: AuthService,
        @Inject('BASE_URL') private baseUrl: string) {

        // create an empty object from the Quiz interface
        this.quiz = <Quiz>{};

        const id = +this.activatedRoute.snapshot.params['id'];
        console.log(id);
        if (id) {
            const url = this.baseUrl + 'api/quiz/' + id;

            this.http.get<Quiz>(url).subscribe(result => {
                this.quiz = result;
            }, error => console.error(error));
        } else {
            console.log('Invalid id: routing back to home...');
            this.router.navigate(['home']);
        }
    }

    onEdit() {
        this.router.navigate(['quiz/edit', this.quiz.Id]);
    }


    onDelete() {
        if (confirm('Do you really want to delete this quiz?')) {
            const url = this.baseUrl + 'api/quiz/' + this.quiz.Id;
            this.http
                .delete(url)
                .subscribe(result => {
                    console.log('Quiz ' + this.quiz.Id + ' has been deleted.');
                    this.router.navigate(['home']);
                }, error => console.log(error));
        }
    }
}
