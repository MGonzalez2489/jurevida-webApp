import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantSearchComponent } from './pages/assistant-search/assistant-search.component';

const routes: Routes = [{ path: '', component: AssistantSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAssistantRoutingModule {}
