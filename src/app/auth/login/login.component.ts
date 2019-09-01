import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserModel } from '../../shared/models/user/user.model';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UserModel = { login: null, password: null};

  constructor(
    private authService: AuthService,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  public onLogin(): void {
    if (this.authService.login(this.loginForm.login, this.loginForm.password)) {
      this.message.success(`You are logged in as ${this.authService.role}`);
    } else {
      this.message.fail('We can\'t find you. Are your credentials correct?');
    }
  }

}
