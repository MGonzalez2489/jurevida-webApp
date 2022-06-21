import { BaseSearchCriteria } from './base-search-criteria';

export class UserSearchCriteria extends BaseSearchCriteria {
  profile: string | 'consejo' | 'asociado' | 'patrocinador' = '';
}
