import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

//material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PageComponent } from './components/layout/page/page.component';
import { RouterModule } from '@angular/router';
import { StopPropagationDirective } from './directives/';
import { MatDialogModule } from '@angular/material/dialog';
import { PhonePipe } from './pipes/phone.pipe';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    NavbarComponent,
    PageComponent,
    StopPropagationDirective,
    PhonePipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports: [StopPropagationDirective, PhonePipe],
})
export class SharedModule {}
