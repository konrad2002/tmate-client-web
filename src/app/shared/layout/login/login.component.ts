import {Component} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../core/service/auth.service';

@Component({
    selector: 'app-login',
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true
})
export class LoginComponent {

    loginForm: FormGroup

    constructor(
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators. required],
        })
    }

    login() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
}
