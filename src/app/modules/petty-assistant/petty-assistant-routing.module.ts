import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PettySearchComponent } from './pages/petty-search/petty-search.component';

const routes: Routes = [{ path: '', component: PettySearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PettyAssistantRoutingModule {}
