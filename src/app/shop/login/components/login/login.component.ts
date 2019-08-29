import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }

  public  get login() {
    return this.loginForm.get('login');
  }

  public  get password() {
    return this.loginForm.get('password');
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  public onLogin(): void {
    this.authService.login(this.login.value, this.password.value);
  }

}
