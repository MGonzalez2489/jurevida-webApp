import { BaseModel } from './base.model';

export class AssociateProfileModel extends BaseModel {
  placeOfBirth: string = '';
  rfc: string = '';
  maritalStatus: string = '';
  profession: string = '';
  //placeOfBirth: { type: 'string' },
  //rfc: { type: 'string' },
  //maritalStatus: { type: 'string' },
  //profession: { type: 'string' },
}
