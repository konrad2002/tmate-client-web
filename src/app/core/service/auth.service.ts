import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, ReplaySubject} from 'rxjs';
import {UserModel} from '../model/user.model';
import {UserService} from './api/user.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject = new BehaviorSubject<UserModel>({} as UserModel);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private scopesSubject = new ReplaySubject<string[]>(1);
    public scopes = this.scopesSubject.asObservable();

    private claimsSubject = new ReplaySubject<Record<string, any>>(1)
    public claims = this.claimsSubject.asObservable();

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.isAuthenticatedSubject.next(window.localStorage.getItem("token") != undefined);
    }

    login(username: string, password: string) {
        this.userService.login(username, password).subscribe({
            next: token => {
                this.isAuthenticatedSubject.next(true);
                window.localStorage.setItem("token", token);
                this.router.navigateByUrl(this.router.createUrlTree([""]))
            }, error: err => {
                console.log(err);

            }
        })
    }

    logout() {
        console.log("Logout!")
        this.isAuthenticatedSubject.next(false);
        window.localStorage.removeItem("token");
        this.router.navigateByUrl(this.router.createUrlTree(["login"]))
    }
}
