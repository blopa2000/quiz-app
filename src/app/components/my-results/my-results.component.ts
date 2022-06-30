import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserExists } from '@models/user.model';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss'],
})
export class MyResultsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'result', 'url'];
  dataSource: any;

  user!: UserExists;
  results: any = [];

  constructor(private userService: UserService, private router: Router) {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async ngOnInit(): Promise<void> {
    const res: any = await this.userService.getMyResults(this.user.uid);
    if (res !== false) {
      res.forEach((element: any) => {
        this.results.push(element.data());
      });
      this.dataSource = new MatTableDataSource<any>(this.results);
    }
  }

  goForm(url: string) {
    this.router.navigate([`..${url}`]);
  }
}
