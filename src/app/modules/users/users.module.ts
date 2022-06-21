import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SearchUserComponent } from './pages/search-user/search-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '@shared/_shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CreateCouncilComponent } from './pages/create-council/create-council.component';
import { CreateSponsorComponent } from './pages/create-sponsor/create-sponsor.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [SearchUserComponent, CreateCouncilComponent, CreateSponsorComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatSortModule,
    MatCardModule,
    SharedModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgxMaskModule.forRoot()
  ]
})
export class UsersModule {}
