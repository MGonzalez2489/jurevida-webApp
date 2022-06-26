import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCouncilComponent } from './pages/create-council/create-council.component';
import { CreateSponsorComponent } from './pages/create-sponsor/create-sponsor.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchUserComponent } from './pages/search-user/search-user.component';

const routes: Routes = [
  {
    path: '',
    component: SearchUserComponent
  },
  {
    path: 'create-council',
    component: CreateCouncilComponent
  },
  { path: ':id/profile', component: ProfileComponent },
  { path: 'create-sponsor', component: CreateSponsorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
