import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocietyComponent } from './pages/society/society.component';

const routes: Routes = [{ path: '', component: SocietyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocietyRoutingModule {}
