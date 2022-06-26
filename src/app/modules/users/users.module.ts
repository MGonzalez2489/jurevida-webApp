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
import { ProfileComponent } from './pages/profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileGeneralInfoComponent } from './components/profile-general-info/profile-general-info.component';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileSponsorInfoComponent } from './components/profile-sponsor-info/profile-sponsor-info.component';
import { ProfileCouncilInfoComponent } from './components/profile-council-info/profile-council-info.component';
import { ProfileAssociatedInfoComponent } from './components/profile-associated-info/profile-associated-info.component';
import { AddCouncilContributionComponent } from './components/add-council-contribution/add-council-contribution.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    SearchUserComponent,
    CreateCouncilComponent,
    CreateSponsorComponent,
    ProfileComponent,
    ProfileGeneralInfoComponent,
    ProfileSponsorInfoComponent,
    ProfileCouncilInfoComponent,
    ProfileAssociatedInfoComponent,
    AddCouncilContributionComponent
  ],
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
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    NgxMaskModule.forRoot()
  ]
})
export class UsersModule {}
