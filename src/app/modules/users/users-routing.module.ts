import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SearchUserComponent } from './pages/search-user/search-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: SearchUserComponent,
    data: { title: 'Buscar Usuario' },
  },
  {
    path: 'create',
    component: CreateUserComponent,
    data: { title: 'Nuevo Usuario' },
  },
  {
    path: ':id/edit',
    component: UpdateUserComponent,
    data: { title: 'Editar Usuario' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
