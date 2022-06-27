import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@models/quiz.model';
import { QuizService } from '@services/quiz/quiz.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@components/dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  quiz: Quiz = {
    title: '',
    correctAnswers: [],
    description: '',
    questions: [],
    id: '',
    userUID: '',
  };
  user: any = {};
  alert = {
    show: false,
    message: '',
  };

  constructor(
    private Router: ActivatedRoute,
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: Auth,
    public dialog: MatDialog
  ) {
    this.buildForm();
  }

  async ngOnInit(): Promise<void> {
    this.Router.paramMap.subscribe(async (params) => {
      const id = params.get('quizID');

      const res = await this.quizService.getQuiz(id);
      this.quiz = { ...res, id };

      for (const iterator of this.quiz.questions) {
        this.createSelect();
      }
    });

    onAuthStateChanged(this.auth, async (currentuser) => {
      if (currentuser) {
        const res = await this.userService.getUser(currentuser.uid);
        this.user = {
          uid: currentuser.uid,
          email: currentuser?.email,
          ...res,
        };
      } else {
        this.openDialog();
      }
    });
  }

  async saveForm() {
    if (this.form.valid) {
      let counter: number = 0;
      for (let index = 0; index < this.quiz.correctAnswers.length; index++) {
        if (
          this.quiz.correctAnswers[index].text == this.form.value.selects[index]
        ) {
          counter++;
        }
      }
      const dto = {
        name: this.user.name,
        result: `${counter}/${this.quiz.correctAnswers.length}`,
        email: this.user.email,
      };
      const res: any = await this.quizService.saveResult(
        this.quiz.id,
        this.user.uid,
        dto
      );

      if (res.state) {
        console.log('redireccionar');
      } else {
        this.alert = {
          show: true,
          message: res.message,
        };

        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      selects: this.formBuilder.array([]),
    });
  }

  private createSelect() {
    this.selectsField.push(new FormControl('', Validators.required));
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.user = { ...result, uid: undefined };
    });
  }

  get selectsField() {
    return this.form.get('selects') as FormArray;
  }
}
