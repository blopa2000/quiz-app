import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';

import { Answer, Question } from '@models/quiz.model';
import { UserExists } from '@models/user.model';

import { QuizService } from '@services/quiz/quiz.service';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.scss'],
})
export class FormQuizComponent implements OnInit {
  form!: FormGroup;
  titleQustionField = new FormControl('', [Validators.required]);
  answerTextFiled = new FormControl('');

  user!: UserExists;
  answers: Answer[] = [];
  questions: Question[] = [];
  isCorrectAnswer: boolean | null = false;
  alertAnswer = {
    show: false,
    message: '',
  };

  title: string = '';
  description: string = '';
  quizID: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();

    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params: any): Promise<any> => {
      if (params.get('id')) {
        const res = await this.quizService.getQuiz(params.get('id'));
        if (res === undefined) return this.router.navigate(['home']);

        this.titleField?.setValue(res.title);
        this.descriptionField?.setValue(res.description);
        this.questions = res.questions;
        this.quizID = params.get('id');
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  async saveQuiz() {
    if (this.form.valid) {
      const correctAnswers = [];

      for (const question of this.questions) {
        correctAnswers.push(
          ...question.answers.filter((answer) => answer.isCorrect === true)
        );
      }

      const { title, description } = this.form.value;

      if (this.quizID.length === 0) {
        const addQuiz = await this.quizService.addQuiz(
          {
            title,
            description,
            questions: this.questions,
            correctAnswers,
          },
          this.user.uid
        );

        if (addQuiz) {
          return this.location.back();
        }

        this.alertAnswer = {
          show: true,
          message: 'Error creating quiz',
        };
      } else {
        const updateQuiz = await this.quizService.updateQuiz(
          {
            title,
            description,
            questions: this.questions,
            userUID: this.user.uid,
            correctAnswers,
          },
          this.quizID
        );
        if (updateQuiz) {
          return this.location.back();
        }

        this.alertAnswer = {
          show: true,
          message: 'Error updating quiz',
        };
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveQuestion() {
    if (this.titleQustionField.invalid)
      return this.titleQustionField.markAllAsTouched();

    if (this.answers.length < 2)
      return (this.alertAnswer = {
        show: true,
        message: 'must have at least 2 answers',
      });

    if (!this.isCorrectAnswer && this.isCorrectAnswer !== null)
      return (this.alertAnswer = {
        show: true,
        message: 'you have to mark the correct answer',
      });

    this.questions.push({
      title: this.titleQustionField.value,
      answers: this.answers,
    });

    this.alertAnswer.show = false;
    this.titleQustionField.reset();
    this.answers = [];
    this.isCorrectAnswer = false;
  }

  addAnswer() {
    this.answers.push({
      text: this.answerTextFiled.value,
      isCorrect: this.isCorrectAnswer ? this.isCorrectAnswer : false,
    });
    if (this.isCorrectAnswer) this.isCorrectAnswer = null;
    this.answerTextFiled.reset();
  }

  deleteQuestion(id: any) {
    this.questions.splice(id, 1);
  }

  deleteanswer(id: any) {
    this.answers.splice(id, 1);
    if (this.isCorrectAnswer === null) this.isCorrectAnswer = false;
  }

  get titleField() {
    return this.form.get('title');
  }

  get descriptionField() {
    return this.form.get('description');
  }
}
