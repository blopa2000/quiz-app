import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Quiz } from '@models/quiz.model';

import { DialogComponent } from '@components/dialog/dialog.component';

import { QuizService } from '@services/quiz/quiz.service';
import { UserService } from '@services/user/user.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: Auth,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.buildForm();
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('quizID');

      const res = await this.quizService.getQuiz(id);
      if (res === undefined) this.router.navigate(['home']);

      this.quiz = { ...res, id };

      for (const iterator of this.quiz.questions) {
        this.createSelect();
      }
    });

    const unsubscribe = onAuthStateChanged(this.auth, async (currentuser) => {
      if (currentuser) {
        const res = await this.userService.getUser(currentuser.uid);
        this.user = {
          uid: currentuser.uid,
          email: currentuser?.email,
          ...res,
        };
      } else {
        if (this.location.path().includes('quiz')) {
          this.openDialog();
        }
      }
    });
    unsubscribe();
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
      //result => quiz
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

      //result => user
      const resultUser = await this.userService.addResult(
        this.user.uid,
        this.quiz.id,
        {
          title: this.quiz.title,
          result: dto.result,
          url: this.location.path(),
        }
      );

      if (res.state && resultUser) {
        this.router.navigate(['result'], {
          queryParams: {
            ...dto,
            existProfile: this.user.uid ? 'y' : 'n',
            quizTitle: this.quiz.title,
          },
          queryParamsHandling: 'merge',
        });
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
