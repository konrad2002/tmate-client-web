import {Component, OnInit} from '@angular/core';
import {QueryModel} from '../../../core/model/query.model';
import {QueryService} from '../../../core/service/api/query.service';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {UserModel} from '../../../core/model/user.model';
import {UserService} from '../../../core/service/api/user.service';
import {MatButton} from '@angular/material/button';
import {QueryDialogService} from '../../../core/service/dialog/query-dialog.service';
import {SpinnerComponent} from '../../../shared/elements/spinner/spinner.component';

@Component({
    selector: 'app-query-manager',
    imports: [
        NgForOf,
        KeyValuePipe,
        MatButton,
        SpinnerComponent
    ],
    templateUrl: './query-manager.component.html',
    styleUrl: './query-manager.component.scss',
    standalone: true
})
export class QueryManagerComponent implements OnInit {
    queries = new Map<UserModel, QueryModel[]>();
    users = new Map<string, UserModel>();

    fetching = false;

    constructor(
        private queryService: QueryService,
        private userService: UserService,
        private queryDialogService: QueryDialogService
    ) {
    }

    ngOnInit() {
        this.fetching = true;
        this.userService.getUsers().subscribe(users => {
            for (const user of users) {
                this.users.set(user.id, user);
            }

            this.users.set("000000000000000000000000", {first_name: "Alle"} as UserModel);

            this.queryService.getQueries().subscribe(queries => {
                for (const query of queries) {
                    const user = this.users.get(query.owner_user_id)
                    if (!user) continue
                    if (!this.queries.has(user)) {
                        this.queries.set(user, []);
                    }
                    this.queries.get(user)!.push(query);
                }
                this.fetching = false;
            })
        })

    }

    onEditQuery(query: QueryModel) {
        this.queryDialogService.openQueryEditDialog(true, query)
    }
}
