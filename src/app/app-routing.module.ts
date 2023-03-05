import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateSessionGuard } from '@core/guards';
import { AdminAccessGuard } from '@core/guards/admin-access.guard';
import { PageComponent } from '@shared/components/layout/page/page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  //{ path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: PageComponent,
    canActivate: [ValidateSessionGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
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
        path: 'finance',
        loadChildren: () => import('./modules/finance/finance.module').then((m) => m.FinanceModule)
      },
      {
        //admin
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        canActivate: [AdminAccessGuard]
      },
      {
        //admin
        path: 'assistant',
        loadChildren: () => import('./modules/bank-assistant/bank-assistant.module').then((m) => m.BankAssistantModule),
        canActivate: [AdminAccessGuard]
      },
      {
        //admin
        path: 'petty',
        loadChildren: () => import('./modules/petty-assistant/petty-assistant.module').then((m) => m.PettyAssistantModule),
        canActivate: [AdminAccessGuard]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
