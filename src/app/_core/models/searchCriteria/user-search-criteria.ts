import { BaseSearchCriteria } from './base-search-criteria';

export class UserSearchCriteria extends BaseSearchCriteria {
  profile: string | 'council' | 'associated' | 'sponsor' = '';
}
