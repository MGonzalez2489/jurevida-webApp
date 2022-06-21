import { BaseModel } from './base.model';
import { ContributionModel } from './contribution.model';

export class CouncilProfileModel extends BaseModel {
  contributions: Array<ContributionModel> = [];
}
