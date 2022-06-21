import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCouncilComponent } from './pages/create-council/create-council.component';
import { SearchUserComponent } from './pages/search-user/search-user.component';

const routes: Routes = [
  {
    path: '',
    component: SearchUserComponent,
    data: { title: 'Buscar Usuario' }
  },
  {
    path: 'create-council',
    component: CreateCouncilComponent,
    data: { title: 'Nuevo Usuario' }
  }
  //{
  //path: ':id/edit',
  //component: UpdateUserComponent,
  //data: { title: 'Editar Usuario' },
  //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
