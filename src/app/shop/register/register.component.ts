import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.initRegisterForm();
  }

  public onRegister(): void {
    this.authService.register({
      name: this.name.value,
      login: this.login.value,
      password: this.password.value,
      isAdmin: Boolean(this.isAdmin.value),
    });
  }

  public get name() {
    return this.registerForm.get('name');
  }

  public  get login() {
    return this.registerForm.get('login');
  }

  public  get password() {
    return this.registerForm.get('password');
  }

  private  get isAdmin() {
    return this.registerForm.get('isAdmin');
  }

  private initRegisterForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      isAdmin: new FormControl(null, )
    });
  }

}
