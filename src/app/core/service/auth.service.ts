import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, ReplaySubject} from 'rxjs';
import {UserModel} from '../model/user.model';
import {UserService} from './api/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.isAuthenticatedSubject.next(window.localStorage.getItem("token") != undefined);
    }

    login(username: string, password: string) {
        this.userService.login(username, password).subscribe({
            next: token => {
                this.isAuthenticatedSubject.next(true);
                window.localStorage.setItem("token", token);
                this.snackBar.open("Anmeldung erfolgreich!");
                this.fetchUser();
                this.router.navigateByUrl(this.router.createUrlTree([""]))
            }, error: err => {
                console.log(err);
                this.snackBar.open("Fehler beim Anmelden: " + err);
            }
        })
    }

    logout() {
        console.log("Logout!")
        this.isAuthenticatedSubject.next(false);
        window.localStorage.removeItem("token");
        this.snackBar.open("Du wurdest abgemeldet!");
        this.router.navigateByUrl(this.router.createUrlTree(["login"]))
    }

    fetchUser() {
        this.userService.getUserForMe().subscribe(user => {
            this.currentUserSubject.next(user);
        })
    }
}
