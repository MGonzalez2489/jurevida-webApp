import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@core/services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false)
  });
  inpPasswordType: string = 'password';
  get form() {
    return this.loginForm.controls;
  }
  constructor(private service: AuthService, private route: Router, private sessionService: SessionService) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.service.postLogin(this.loginForm.value).subscribe(
      (data) => {
        this.sessionService.initializeSession(data.model, this.loginForm.value.rememberMe);
        this.route.navigate(['/']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  changePasswordInputType(): void {
    this.inpPasswordType = this.inpPasswordType == 'password' ? 'text' : 'password';
  }
}
