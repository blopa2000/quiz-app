import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '@services/quiz/quiz.service';

@Component({
  selector: 'app-detail-quiz',
  templateUrl: './detail-quiz.component.html',
  styleUrls: ['./detail-quiz.component.scss'],
})
export class DetailQuizComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'hasProfile',
    'name',
    'email',
    'result',
    'delete',
  ];
  listUsers: any[] = [];
  dataSource: any;
  unsubscribe: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private location: Location,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: any) => {
      this.unsubscribe = onSnapshot(
        collection(this.firestore, 'quizzes', params.get('id'), 'userResults'),
        (snapshot) => {
          snapshot.docChanges().forEach((result) => {
            if (result.type === 'removed') {
              this.listUsers = this.listUsers.filter(
                (list) => list.userID !== result.doc.id
              );
            }
            if (result.type === 'added') {
              this.listUsers.push({
                ...result.doc.data(),
                userID: result.doc.id,
                quizID: params.get('id'),
              });
            }
          });
          this.dataSource = new MatTableDataSource<any>(this.listUsers);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  comeBack() {
    this.location.back();
  }

  deleteUser(userID: string, quizID: string) {
    this.quizService.deleteUSerResult(userID, quizID);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
