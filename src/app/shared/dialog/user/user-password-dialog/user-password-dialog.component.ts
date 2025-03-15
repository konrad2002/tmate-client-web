import {Component, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth.service';
import {UserService} from '../../../../core/service/api/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

export interface UserPasswordDialogData {
    username?: string
    temp: boolean
}

@Component({
    selector: 'app-user-password-dialog',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogTitle,
        MatFormField,
        MatInput,
        FormsModule,
        MatLabel,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './user-password-dialog.component.html',
    styleUrl: './user-password-dialog.component.scss',
    standalone: true
})
export class UserPasswordDialogComponent {

    changePasswordForm: FormGroup

    constructor(
        public dialogRef: MatDialogRef<UserPasswordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserPasswordDialogData,
        private userService: UserService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.changePasswordForm = this.fb.group({
            password: ['', Validators.required],
            password2: ['', Validators.required]
        }, { validator: this.passwordsMatchValidator });
    }

    passwordsMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const password2 = formGroup.get('password2')?.value;

        return password === password2 ? null : { passwordsMismatch: true };
    }

    changePassword() {
        if (this.data.username) {
            this.userService.changePasswordForUser(this.data.username, this.changePasswordForm.value.password).subscribe({
                next: _ => {
                    this.snackBar.open("Passwort ändern erfolgreich!");
                    this.dialogRef.close();
                }, error: err => {
                    console.log(err);
                    this.snackBar.open("Fehler beim Ändern des Passworts: " + err.message);
                }
            });
        } else {
            this.userService.changePasswordForMe(this.changePasswordForm.value.password).subscribe({
                next: _ => {
                    this.snackBar.open("Passwort ändern erfolgreich!");
                    //this.authService.logout()
                    this.dialogRef.close();
                }, error: err => {
                    console.log(err);
                    this.snackBar.open("Fehler beim Ändern des Passworts: " + err.message);
                }
            });
        }
    }
}
