import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserModel } from '../../shared/models/user/user.model';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: UserModel = {
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
      isAdmin: Boolean(isAdmin), // разве это свойство не boolean? зачем тут Boolean()
    })) {
      this.message.success(`You are registered, welcome, ${name}`);
      this.authService.login(login, password);
    } else {
      this.message.fail(`${name}, Some thing went wrong`);
    }
  }

}
