import { Injectable } from '@angular/core';
import { UserTypes } from '../models/user/user.types';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usersList: Array<UserTypes>;
  public isLogined: boolean;
  public activeUser$: BehaviorSubject<UserTypes> = new BehaviorSubject(null);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.initLoadUsers();
  }

  private changeUserLocalStorageState(user?: UserTypes): void {
    if (user) {
      LocalStorageService.stringifyItem('activeUser', user);
    } else {
      LocalStorageService.stringifyItem('activeUser', null);
    }
  }

  private isUserValid(user: UserTypes): boolean {
    const hasUserLoginAndPassword = Boolean(user.password && user.login);
    const isItUniqCredentials = Boolean(!this.findUserByLogin(user.login));

    return hasUserLoginAndPassword && isItUniqCredentials;
  }

  public get role(): string {
    if (this.isLogined) {
      return this.activeUser$.value.isAdmin ? 'admin' : 'customer';
    }
    return 'not logined';
  }

  public findUserByLogin(login: string): UserTypes {
    return this.usersList
      .find((currentUser) => currentUser.login === login);
  }

  public findUser(login: string, password: string): UserTypes {
    return this.usersList
      .find((currentUser) =>
        currentUser.password === password && currentUser.login === login);
  }

  public isLoginnedAndNotAdmin(): boolean {
    return Boolean(this.isLogined && !this.activeUser$.value.isAdmin);
  }

  public isLoginnedAndAdmin(): boolean {
    return Boolean(this.isLogined && this.activeUser$.value.isAdmin);
  }

  public login(login: string, password: string): boolean {
    const user = this.findUser(login, password);
    if (user) {
      this.isLogined = true;
      this.activeUser$.next(user);
      this.updateActiveUser();
      this.router.navigateByUrl('/');
    }
    return !!user;
  }

  public logout(): void {
    this.isLogined = false;
    this.activeUser$.next(null);
    this.changeUserLocalStorageState();
  }

  public register(user: UserTypes): boolean {
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
    LocalStorageService.stringifyItem('activeUser', this.activeUser$.value);
  }

  private initLoadUsers(): void {
    this.usersList = LocalStorageService.parseItem<Array<UserTypes>>('usersList') || [];
    this.activeUser$.next(LocalStorageService.parseItem<UserTypes>('activeUser'));
    this.isLogined = !!this.activeUser$.value;
  }
}
