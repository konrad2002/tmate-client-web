import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../core/model/user.model';
import {UserService} from '../../../core/service/api/user.service';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {UserDialogService} from '../../../core/service/dialog/user-dialog.service';

@Component({
    selector: 'app-user-manager',
    imports: [
        NgIf,
        MatButton
    ],
    templateUrl: './user-manager.component.html',
    styleUrl: './user-manager.component.scss',
    standalone: true
})
export class UserManagerComponent implements OnInit{
    users: UserModel[] = [];

    constructor(
        private userService: UserService,
        private userDialogService: UserDialogService
    ) {
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        })
    }

    changePassword(username: string) {
        this.userDialogService.openPasswordChangeDialog(false, username);
    }
}
