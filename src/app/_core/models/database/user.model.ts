import { AssociateProfileModel } from './associate-profile.model';
import { BaseModel } from './base.model';
import { CouncilProfileModel } from './council-profile.model';
import { SponsorProfileModel } from './sponsor-profile.model';

export class UserModel extends BaseModel {
  firstName: string = '';
  lastName: string = '';
  fullName: string = '';
  gender: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  firstLogin: boolean = false;
  avatar: string = '';

  council?: CouncilProfileModel;
  sponsor?: SponsorProfileModel;
  associated?: AssociateProfileModel;
  administrator?: {};
}
