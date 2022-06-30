import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { User } from '@models/user.model';
import { DocumentData } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | DocumentData | undefined = {
    name: '',
    avatar: '',
  };
  uid: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.user = await this.userService.getUser(params.get('id'));
      this.uid = params.get('id');
      if (this.user === undefined) {
        this.router.navigate(['home']);
      }
    });
  }
}
