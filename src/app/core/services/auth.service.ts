import { Injectable } from '@angular/core';
import { UserModel } from '../../shared/models/user/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) {
    this.initLoadUsers();
  }
  private usersList: Array<UserModel>;
  public isLogined: boolean;
  public activeUser: UserModel;

  private changeUserLocalStorageState(user?: UserModel): void {
    if (user) {
      this.localStorageService.stringifyItem('activeUser', user);
    } else {
      this.localStorageService.stringifyItem('activeUser', null);
    }
  }

  private isUserValid(user: UserModel): boolean {
    return Boolean(user.password && user.login);
  }

  public isLoginnedAndNotAdmin(): boolean {
    return Boolean(this.isLogined && !this.activeUser.isAdmin);
  }

  public login(login: string, password: string): void {
    const user = this.usersList.find((currentUser) => currentUser.password === password && currentUser.login === login);
    if (user) {
      this.isLogined = true;
      this.activeUser = user;
      this.updateActiveUser();
    }
  }

  public logout(): void {
    this.isLogined = false;
    this.activeUser = null;
    this.changeUserLocalStorageState();
  }

  public register(user: UserModel): void {
    if (this.isUserValid(user)) {
      this.usersList.push(user);
      this.updateLocalStorageUserList();
    } else {
      throw Error('Invalid user data...');
    }
  }

  private updateLocalStorageUserList() {
    this.localStorageService.stringifyItem('userList', this.usersList);
  }

  private updateActiveUser() {
    this.localStorageService.stringifyItem('activeUser', this.activeUser);
  }

  private initLoadUsers(): void {
    this.usersList = this.localStorageService.parseItem<Array<UserModel>>('usersList');
    this.activeUser = this.localStorageService.parseItem<UserModel>('activeUser');
    this.isLogined = !!this.activeUser;
  }
}
