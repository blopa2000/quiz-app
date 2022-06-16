import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-quiz',
  templateUrl: './card-quiz.component.html',
  styleUrls: ['./card-quiz.component.scss'],
})
export class CardQuizComponent implements OnInit {
  isProfile: boolean = false;
  url: string = '';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.url = 'localhost:4200/' + this.location.path();
    if (this.url.split('/')[2] == 'profile') this.isProfile = true;
  }

  goForm() {
    this.router.navigate([`quiz/${'hola'}/435534345`]);
  }
}
