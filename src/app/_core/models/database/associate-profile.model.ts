import { BaseModel } from './base.model';

export class AssociateProfileModel extends BaseModel {
  placeOfBirth: string = '';
  rfc: string = '';
  maritalStatus: string = '';
  profession: string = '';
}
