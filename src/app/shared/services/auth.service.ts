import { Injectable } from '@angular/core';
import { UserModel } from '../models/user/user.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersList: Array<UserModel>;
  public isLogined: boolean;
  public activeUser: UserModel;
  public usersUpdate$: Subject<UserModel> = new Subject();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.initLoadUsers();
  }

  private changeUserLocalStorageState(user?: UserModel): void {
    if (user) {
      LocalStorageService.stringifyItem('activeUser', user);
    } else {
      LocalStorageService.stringifyItem('activeUser', null);
    }
  }

  private isUserValid(user: UserModel): boolean {
    const hasUserLoginAndPassword = Boolean(user.password && user.login);
    const isItUniqCredentials = Boolean(!this.findUserByLogin(user.login));

    return hasUserLoginAndPassword && isItUniqCredentials;
  }

  public get role(): string {
    if (this.isLogined) {
      return this.activeUser.isAdmin ? 'admin' : 'customer';
    }
    return 'not logined';
  }

  public findUserByLogin(login: string): UserModel {
    return this.usersList
      .find((currentUser) => currentUser.login === login);
  }

  public findUser(login: string, password: string): UserModel {
    return this.usersList
      .find((currentUser) =>
        currentUser.password === password && currentUser.login === login);
  }

  public isLoginnedAndNotAdmin(): boolean {
    return Boolean(this.isLogined && !this.activeUser.isAdmin);
  }

  public isLoginnedAndAdmin(): boolean {
    return Boolean(this.isLogined && this.activeUser.isAdmin);
  }

  public login(login: string, password: string): boolean {
    const user = this.findUser(login, password);
    if (user) {
      this.isLogined = true;
      this.activeUser = user;
      this.updateActiveUser();
      this.router.navigateByUrl('/');
      this.usersUpdate$.next(this.activeUser);
    }
    return !!user;
  }

  public logout(): void {
    this.isLogined = false;
    this.activeUser = null;
    this.usersUpdate$.next(this.activeUser);
    this.changeUserLocalStorageState();
  }

  public register(user: UserModel): boolean {
    if (this.isUserValid(user)) {
      this.usersList.push(user);
      this.updateLocalStorageUserList();
      return true;
    } else {
      return false;
    }
  }

  private updateLocalStorageUserList() {
    LocalStorageService.stringifyItem('usersList', this.usersList);
  }

  private updateActiveUser() {
    LocalStorageService.stringifyItem('activeUser', this.activeUser);
  }

  private initLoadUsers(): void {
    this.usersList = LocalStorageService.parseItem<Array<UserModel>>('usersList') || [];
    this.activeUser = LocalStorageService.parseItem<UserModel>('activeUser');
    this.isLogined = !!this.activeUser;
  }
}
