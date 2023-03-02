import { Component, Input } from '@angular/core';
import { UserModel } from '@core/models/database';

@Component({
  selector: 'app-profile-associated-info',
  templateUrl: './profile-associated-info.component.html',
  styleUrls: ['./profile-associated-info.component.scss']
})
export class ProfileAssociatedInfoComponent {
  @Input()
  user: UserModel = new UserModel();
  constructor() {}
}
