import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@core/models/database';

@Component({
  selector: 'app-profile-sponsor-info',
  templateUrl: './profile-sponsor-info.component.html',
  styleUrls: ['./profile-sponsor-info.component.scss']
})
export class ProfileSponsorInfoComponent implements OnInit {
  @Input()
  user: UserModel = new UserModel();

  constructor() {}

  ngOnInit(): void {}
}
