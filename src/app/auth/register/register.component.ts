import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserTypes } from '../../shared/models/user/user.types';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: UserTypes = {
    login: null,
    password: null,
    isAdmin: null,
    name: null,
  };

  constructor(
    private authService: AuthService,
    private message: MessageService
  ) { }

  public onRegister(): void {
    const { name, isAdmin, login, password } = this.registerForm;
    if (this.authService.register({
      name,
      login,
      password,
      isAdmin,
    })) {
      this.message.success(`You are registered, welcome, ${name}`);
      this.authService.login(login, password);
    } else {
      this.message.fail(`${name}, Some thing went wrong`);
    }
  }

}
