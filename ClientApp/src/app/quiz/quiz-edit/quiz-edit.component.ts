import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-quiz-edit',
    templateUrl: './quiz-edit.component.html',
    styleUrls: ['./quiz-edit.component.css']
})

export class QuizEditComponent {
    title: string;
    quiz: Quiz;
    form: FormGroup;

    // this will be TRUE when editing an existing quiz,
    //   FALSE when creating a new one.
    editMode: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private fb: FormBuilder,
        @Inject('BASE_URL') private baseUrl: string) {

        // create an empty object from the Quiz interface
        this.quiz = <Quiz>{};

        // initialize the form
        this.createForm();

        const id = +this.activatedRoute.snapshot.params['id'];
        if (id) {
            this.editMode = true;

            // fetch the quiz from the server
            const url = this.baseUrl + 'api/quiz/' + id;
            this.http.get<Quiz>(url).subscribe(result => {
                this.quiz = result;
                this.title = 'Edit - ' + this.quiz.Title;

                // update the form with the quiz value
                this.updateForm();
            }, error => console.error(error));
        } else {
            this.editMode = false;
            this.title = 'Create a new Quiz';
        }
    }

    createForm() {
        this.form = this.fb.group({
            Title: ['', Validators.required],
            Description: '',
            Text: ''
        });
    }

    updateForm() {
        this.form.setValue({
            Title: this.quiz.Title,
            Description: this.quiz.Description || '',
            Text: this.quiz.Text || ''
        });
    }

    // retrieve a FormControl
    getFormControl(name: string) {
        return this.form.get(name);
    }

    // return TRUE if the FormControl is valid
    isValid(name: string) {
        const e = this.getFormControl(name);
        return e && e.valid;
    }

    // return TRUE if the FormControl has been changed
    isChanged(name: string) {
        const e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    // return TRUE if the FormControl is invalid after user changes
    hasError(name: string) {
        const e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }

    onSubmit() {
        // build a temporary quiz object from form values
        const tempQuiz = <Quiz>{};
        tempQuiz.Title = this.form.value.Title;
        tempQuiz.Description = this.form.value.Description;
        tempQuiz.Text = this.form.value.Text;

        const url = this.baseUrl + 'api/quiz';

        if (this.editMode) {
            // dont't forget to set the tempQuiz Id
            //  otherwise the EDIT would fail
            tempQuiz.Id = this.quiz.Id;

            this.http
                .post<Quiz>(url, tempQuiz)
                .subscribe(res => {
                    this.quiz = res;
                    console.log('Quiz ' + this.quiz.Id + ' has been updated.');
                    this.router.navigate(['home']);
                }, error => console.log(error));
        } else {
            this.http
                .put<Quiz>(url, tempQuiz)
                .subscribe(res => {
                    const v = res;
                    console.log('Quiz ' + v.Id + ' has been created.');
                    this.router.navigate(['home']);
                }, error => console.log(error));
        }
    }

    onBack() {
        this.router.navigate(['home']);
    }
}

