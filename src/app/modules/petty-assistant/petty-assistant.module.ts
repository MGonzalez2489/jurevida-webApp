import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyAssistantRoutingModule } from './petty-assistant-routing.module';
import { PettySearchComponent } from './pages/petty-search/petty-search.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/_shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PettySearchComponent],
  imports: [
    CommonModule,
    PettyAssistantRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ]
})
export class PettyAssistantModule {}
