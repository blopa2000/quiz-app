import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';

import { UserExists } from '@models/user.model';
import { Quiz } from '@models/quiz.model';

import { UserService } from '@services/user/user.service';
import { QuizService } from '@services/quiz/quiz.service';

@Component({
  selector: 'app-card-quiz',
  templateUrl: './card-quiz.component.html',
  styleUrls: ['./card-quiz.component.scss'],
})
export class CardQuizComponent implements OnInit {
  isProfile: boolean = false;
  quizzes: Quiz[] = [];
  user: UserExists = {
    email: '',
    uid: '',
  };

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService,
    private quizService: QuizService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async ngOnInit() {
    let operator: string = '';
    if (this.location.path().split('/')[1] === 'profile') {
      this.isProfile = true;
      operator = '==';
    } else {
      operator = '!=';
    }
    const query: any = await this.quizService.getQuizzesByUserID(
      this.user.uid,
      operator
    );

    query.forEach((quiz: any) => {
      this.quizzes.push({ ...quiz.data(), id: quiz.id });
    });
  }

  goForm(id: string | undefined, userUID: string) {
    this.router.navigate([`quiz/${userUID}/${id}`]);
  }

  transformUrlshared(id: string | undefined, userUID: string) {
    const domain = this.document.location.href.split('/');
    return `${domain[2]}/quiz/${userUID}/${id}`;
  }

  async deleteQuiz(quizID: string, index: number) {
    const res = await this.quizService.deleteQuiz(quizID);
    if (res) {
      this.quizzes.splice(index, 1);
    }
  }

  async copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    console.log('Page URL copied');
  }
}
