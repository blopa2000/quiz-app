import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  formQuiz = [
    {
      id: '1',
      title: 'What is the capital of France?',
      answers: [
        {
          id: '1',
          title: 'Paris',
          isCorrect: true,
        },
        {
          id: '2',
          title: 'Lyon',
          isCorrect: false,
        },
        {
          id: '3',
          title: 'Marseille',
          isCorrect: false,
        },
        {
          id: '4',
          title: 'Toulouse',
          isCorrect: false,
        },
      ],
    },
    {
      id: '2',
      title: 'What is the capital of Germany?',
      answers: [
        {
          id: '1',
          title: 'Berlin',
          isCorrect: true,
        },
        {
          id: '2',
          title: 'Munich',
          isCorrect: false,
        },
        {
          id: '3',
          title: 'Frankfurt',
          isCorrect: false,
        },
        {
          id: '4',
          title: 'Hamburg',
          isCorrect: false,
        },
      ],
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.formQuiz, event.previousIndex, event.currentIndex);
  }
}
