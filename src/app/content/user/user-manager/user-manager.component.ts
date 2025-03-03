import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../core/model/user.model';
import {UserService} from '../../../core/service/api/user.service';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-user-manager',
    imports: [
        NgIf
    ],
    templateUrl: './user-manager.component.html',
    styleUrl: './user-manager.component.scss',
    standalone: true
})
export class UserManagerComponent implements OnInit{
    users: UserModel[] = [];

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        })
    }
}
