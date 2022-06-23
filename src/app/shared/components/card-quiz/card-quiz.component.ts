import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-quiz',
  templateUrl: './card-quiz.component.html',
  styleUrls: ['./card-quiz.component.scss'],
})
export class CardQuizComponent implements OnInit {
  isProfile: boolean = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    if (this.location.path().split('/')[1] == 'profile') this.isProfile = true;
  }

  goForm() {
    this.router.navigate([`quiz/${'hola'}/435534345`]);
  }
}
