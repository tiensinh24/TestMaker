import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-answer-edit',
    templateUrl: './answer-edit.component.html',
    styleUrls: ['./answer-edit.component.css']
})

export class AnswerEditComponent {
    title: string;
    answer: Answer;
    form: FormGroup;

    // this will be TRUE when editing an existing question,
    //   FALSE when creating a new one.
    editMode: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private fb: FormBuilder,
        @Inject('BASE_URL') private baseUrl: string) {

        // create an empty object from the Quiz interface
        this.answer = <Answer>{};

        this.createForm();

        const id = +this.activatedRoute.snapshot.params['id'];

        // quick & dirty way to check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

        if (this.editMode) {

            // fetch the answer from the server
            const url = this.baseUrl + 'api/answer/' + id;
            this.http.get<Answer>(url).subscribe(result => {
                this.answer = result;
                this.title = 'Edit - ' + this.answer.Text;

                this.updateForm();
            }, error => console.error(error));
        } else {
            this.answer.QuestionId = id;
            this.title = 'Create a new Answer';
        }
    }

    createForm() {
        this.form = this.fb.group({
            Text: ['', Validators.required],
            Value: ['',
                Validators.required,
                Validators.min(-5),
                Validators.max(5)]
        });
    }

    updateForm() {
        this.form.setValue({
            Text: this.answer.Text,
            Value: this.answer.Value
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
        const tempAnswer = <Answer>{};
        tempAnswer.Text = this.form.value.Text;
        tempAnswer.Value = this.form.value.Value;

        const url = this.baseUrl + 'api/answer';

        if (this.editMode) {
            tempAnswer.QuestionId = this.answer.QuestionId;

            this.http
                .post<Answer>(url, tempAnswer)
                .subscribe(res => {
                    const v = res;
                    console.log('Answer ' + v.Id + ' has been updated.');
                    this.router.navigate(['question/edit', v.QuestionId]);
                }, error => console.log(error));
        } else {
            this.http
                .put<Answer>(url, tempAnswer)
                .subscribe(res => {
                    const v = res;
                    console.log('Answer ' + v.Id + ' has been created.');
                    this.router.navigate(['question/edit', v.QuestionId]);
                }, error => console.log(error));
        }
    }

    onBack() {
        this.router.navigate(['question/edit', this.answer.QuestionId]);
    }
}

