import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    styleUrls: ['./question-edit.component.css']
})

export class QuestionEditComponent {
    title: string;
    question: Question;
    form: FormGroup;

    // this will be TRUE when editing an existing question,
    //   FALSE when creating a new one.
    editMode: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private fb: FormBuilder,
        @Inject('BASE_URL') private baseUrl: string) {

        // create an empty object from the Question interface
        this.question = <Question>{};

        this.createForm();

        const id = +this.activatedRoute.snapshot.params['id'];

        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

        if (this.editMode) {

            // fetch the question from the server
            const url = this.baseUrl + 'api/question/' + id;
            this.http.get<Question>(url).subscribe(result => {
                this.question = result;
                this.title = 'Edit - ' + this.question.Text;

                this.updateForm();
            }, error => console.error(error));
        } else {
            this.question.QuizId = id;
            this.title = 'Create a new Question';
        }
    }

    createForm() {
        this.form = this.fb.group({
            Text: ['', Validators.required]
        });
    }

    updateForm() {
        this.form.setValue({
            Text: this.question.Text || ''
        });
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        const e = this.getFormControl(name);
        return e && e.valid;
    }

    isChanged(name: string) {
        const e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    hasError(name: string) {
        const e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }

    onSubmit() {
        const tempQuestion = <Question>{};
        tempQuestion.Text = this.form.value.Text;
        tempQuestion.QuizId = this.question.QuizId;

        const url = this.baseUrl + 'api/question';

        if (this.editMode) {
            tempQuestion.Id = this.question.Id;

            this.http
                .post<Question>(url, tempQuestion)
                .subscribe(res => {
                    const v = res;
                    console.log('Question ' + v.Id + ' has been updated.');
                    this.router.navigate(['quiz/edit', v.QuizId]);
                }, error => console.log(error));
        } else {
            this.http
                .put<Question>(url, tempQuestion)
                .subscribe(res => {
                    const v = res;
                    console.log('Question ' + v.Id + ' has been created.');
                    this.router.navigate(['quiz/edit', v.QuizId]);
                }, error => console.log(error));
        }
    }

    onBack() {
        this.router.navigate(['quiz/edit', this.question.QuizId]);
    }
}
