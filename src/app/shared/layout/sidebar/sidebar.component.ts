import {Component, inject} from '@angular/core';
import {UserDialogService} from '../../../core/service/dialog/user-dialog.service';
import {AuthService} from '../../../core/service/auth.service';
import {MatIcon} from '@angular/material/icon';
import {HasPermissionDirective} from '../../../core/directive/has-permission.directive';
import {QueryDialogService} from '../../../core/service/dialog/query-dialog.service';
import {AdminDialogService} from '../../../core/service/dialog/admin-dialog.service';
import {TableStructureDialogService} from '../../../core/service/dialog/table-structure-dialog.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [
        MatIcon,
        HasPermissionDirective
    ],
    standalone: true
})
export class SidebarComponent {
    private userDialogService: UserDialogService = inject(UserDialogService);
    private queryDialogService: QueryDialogService = inject(QueryDialogService);
    private adminDialogService: AdminDialogService = inject(AdminDialogService);
    private tableStructureDialogService: TableStructureDialogService = inject(TableStructureDialogService);
    private authService: AuthService = inject(AuthService);

    onUserManagementClick() {
        this.userDialogService.openUserManagementDialog();
    }

    onLogoutClick() {
        this.authService.logout();
    }

    onQueryManagementClick() {
        this.queryDialogService.openQueryManagementDialog();
    }

    onAdminClick() {
        this.adminDialogService.openAdminDialog();
    }

    onTableStructureManagementClick() {
        this.tableStructureDialogService.openTableStructureDialog();
    }
}
