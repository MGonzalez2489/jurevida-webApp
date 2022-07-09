import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateSessionGuard } from '@core/guards';
import { PageComponent } from '@shared/components/layout/page/page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [ValidateSessionGuard],
    children: [
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'society',
        loadChildren: () => import('./modules/society/society.module').then((m) => m.SocietyModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./modules/documents/documents.module').then((m) => m.DocumentsModule)
      },
      {
        path: 'assistant',
        loadChildren: () => import('./modules/bank-assistant/bank-assistant.module').then((m) => m.BankAssistantModule)
      },
      { path: '', redirectTo: 'assistant', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
