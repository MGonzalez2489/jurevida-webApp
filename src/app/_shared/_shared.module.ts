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
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from './pipes/date.pipe';
import { ImgPlaceholderDirective } from './directives/img-placeholder.directive';
import { ResetPasswordModalComponent } from './components/reset-password-modal/reset-password-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [NavbarComponent, PageComponent, StopPropagationDirective, PhonePipe, DatePipe, ImgPlaceholderDirective, ResetPasswordModalComponent],
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
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [StopPropagationDirective, PhonePipe, ImgPlaceholderDirective]
})
export class SharedModule {}
