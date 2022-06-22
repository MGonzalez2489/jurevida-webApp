import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocietyRoutingModule } from './society-routing.module';
import { SocietyComponent } from './pages/society/society.component';
import { CouncilComponent } from './components/council/council.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';
import { AssociatedComponent } from './components/associated/associated.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SocietyComponent, CouncilComponent, SponsorComponent, AssociatedComponent],
  imports: [
    CommonModule,
    SocietyRoutingModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatSortModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class SocietyModule {}
