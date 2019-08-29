import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.initLoadUsers();
  }
  private usersList: Array<UserModel>;
  public isLogined: boolean;
  public activeUser: UserModel;

  private static changeUserLocalStorageState(user?: UserModel): void {
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user));
    } else {
      localStorage.setItem('activeUser', null);
    }
  }

  private static isUserValid(user: UserModel): boolean {
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
    AuthService.changeUserLocalStorageState();
  }

  public register(user: UserModel): void {
    if (AuthService.isUserValid(user)) {
      this.usersList.push(user);
      this.updateLocalStorageUserList();
    } else {
      throw Error('Invalid user data...');
    }
  }

  private updateLocalStorageUserList() {
    localStorage.setItem('usersList', JSON.stringify(this.usersList));
  }

  private updateActiveUser() {
    localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
  }

  private initLoadUsers(): void {
    this.usersList = JSON.parse(localStorage.getItem('usersList')) || [];
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.isLogined = !!this.activeUser;
  }
}
