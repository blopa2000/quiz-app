import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent {
  form!: FormGroup;
  titleQustionField = new FormControl('', [Validators.required]);
  answerTextFiled = new FormControl('');

  user!: UserExists;
  answers: Answer[] = [];
  questions: Question[] = [
    {
      title: 'What is the capital of France?',
      answers: [
        {
          text: 'Paris',
          isCorrect: true,
        },
        {
          text: 'Lyon',
          isCorrect: false,
        },
        {
          text: 'Marseille',
          isCorrect: false,
        },
        {
          text: 'Toulouse',
          isCorrect: false,
        },
      ],
    },
    {
      title: 'What is the capital of Germany?',
      answers: [
        {
          text: 'Berlin',
          isCorrect: true,
        },
        {
          text: 'Munich',
          isCorrect: false,
        },
        {
          text: 'Frankfurt',
          isCorrect: false,
        },
        {
          text: 'Hamburg',
          isCorrect: false,
        },
      ],
    },
  ];
  isCorrectAnswer: boolean | null = false;
  alertAnswer = {
    show: false,
    message: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private userService: UserService,
    private location: Location
  ) {
    this.buildForm();

    this.userService.user$.subscribe((user) => {
      this.user = user;
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
      const res = await this.quizService.addQuiz(
        {
          title: this.titleField?.value,
          description: this.descriptionField?.value,
          questions: this.questions,
          correctAnswers,
        },
        this.user.uid
      );

      if (res) {
        return this.location.back();
      }

      this.alertAnswer = {
        show: true,
        message: 'Error creating quiz',
      };
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
