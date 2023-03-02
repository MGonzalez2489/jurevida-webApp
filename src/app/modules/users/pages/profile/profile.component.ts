import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '@core/models/database';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserModel = new UserModel();
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      this.route.navigate(['/users']);
    }
    this.loadProfile(id);
  }
  loadProfile(id: string): void {
    this.userService.getUser(id).subscribe(
      (data) => {
        console.log('complete user', data);
        this.user = data.model;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  update(): void {
    this.loadProfile(this.user.publicId);
  }
}
