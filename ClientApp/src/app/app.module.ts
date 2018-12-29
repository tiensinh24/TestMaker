import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { QuestionEditComponent } from './question/question-edit/question-edit.component';
import { AnswerEditComponent } from './answer/answer-edit/answer-edit.component';
import { ResultEditComponent } from './result/result-edit/result-edit.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { AnswerListComponent } from './answer/answer-list/answer-list.component';
import { ResultListComponent } from './result/result-list/result-list.component';
import { QuizSearchComponent } from './quiz/quiz-search/quiz-search.component';
import { AuthService } from './_services/auth.service';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      QuizListComponent,
      QuizDetailComponent,
      QuizEditComponent,
      QuestionListComponent,
      QuestionEditComponent,
      AnswerListComponent,
      AnswerEditComponent,
      ResultListComponent,
      ResultEditComponent,
      AboutComponent,
      LoginComponent,
      PageNotFoundComponent,
      QuizSearchComponent
   ],
   imports: [
      BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot([
         { path: '', redirectTo: 'home', pathMatch: 'full' },
         { path: 'home', component: HomeComponent },
         { path: 'quiz/create', component: QuizEditComponent },
         { path: 'quiz/edit/:id', component: QuizEditComponent },
         { path: 'quiz/:id', component: QuizDetailComponent },
         { path: 'question/create/:id', component: QuestionEditComponent },
         { path: 'question/edit/:id', component: QuestionEditComponent },
         { path: 'answer/create/:id', component: AnswerEditComponent },
         { path: 'answer/edit/:id', component: AnswerEditComponent },
         { path: 'result/create/:id', component: ResultEditComponent },
         { path: 'result/edit/:id', component: ResultEditComponent },
         { path: 'about', component: AboutComponent },
         { path: 'login', component: LoginComponent },
         { path: '**', component: PageNotFoundComponent }
      ])
   ],
   providers: [
      AuthService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
