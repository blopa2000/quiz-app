import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-quiz',
  templateUrl: './detail-quiz.component.html',
  styleUrls: ['./detail-quiz.component.scss'],
})
export class DetailQuizComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'result'];
  listUsers: any[] = [
    { position: 1, name: 'juan pablo agudelo', result: '10 / 10 ' },
    { position: 2, name: 'pedro alzate', result: '7 / 10' },
  ];
  dataSource = new MatTableDataSource<any>(this.listUsers);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() {}
}
