import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string;
  form: FormGroup;

  constructor(private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string) {

    this.title = 'New User Registration';

    // initialize the form
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Email: ['', Validators.required],
        // Validators.email],
      Password: ['', Validators.required],
      PasswordConfirm: ['', Validators.required],
      DisplayName: ['', Validators.required]
    }, {
        validator: this.passwordConfirmValidator
      });
  }

  onSubmit() {
    // build a temporary user object from form values
    const tempUser = <User>{};
    tempUser.Username = this.form.value.Username;
    tempUser.Email = this.form.value.Email;
    tempUser.Password = this.form.value.Password;
    tempUser.DisplayName = this.form.value.DisplayName;

    const url = this.baseUrl + 'api/user';

    this.http.put<User>(url, tempUser).subscribe(res => {
      if (res) {
        console.log('User ' + res.Username + ' has been created.');

        // redirect to login page
        this.router.navigate(['login']);
      } else {
        // registration failed
        this.form.setErrors({
          'register': 'User registration failed.'
        });
      }
    }, error => console.log(error));
  }

  onBack() {
    this.router.navigate(['home']);
  }

  passwordConfirmValidator(control: FormControl): any {
    const p = control.root.get('Password');
    const pc = control.root.get('PasswordConfirm');
    if (p && pc) {
      if (p.value !== pc.value) {
        pc.setErrors(
          { 'PasswordMismatch': true }
        );
      } else {
        pc.setErrors(null);
      }
    }
    return null;
  }

  // retrieve a FormControl
getFormControl(name: string) {
  return this.form.get(name);
  }
  // returns TRUE if the FormControl is valid
  isValid(name: string) {
  const e = this.getFormControl(name);
  return e && e.valid;
  }
  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
  const e = this.getFormControl(name);
  return e && (e.dirty || e.touched);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
  const e = this.getFormControl(name);
  return e && (e.dirty || e.touched) && !e.valid;
  }

  ngOnInit() {
  }

}
