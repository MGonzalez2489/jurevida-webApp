import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@core/models/database';

@Component({
  selector: 'app-profile-general-info',
  templateUrl: './profile-general-info.component.html',
  styleUrls: ['./profile-general-info.component.scss']
})
export class ProfileGeneralInfoComponent implements OnInit {
  @Input()
  user: UserModel = new UserModel();
  constructor() {}

  ngOnInit(): void {}
}
