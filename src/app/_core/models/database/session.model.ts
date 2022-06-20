import { UserModel } from './user.model';

export class SessionModel {
  token: string = '';
  user: UserModel = new UserModel();
}
