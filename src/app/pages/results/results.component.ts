import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  data: any = {};
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((params: any) => {
      this.data = params?.params;
    });
  }
}
