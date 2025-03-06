import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {PermissionSet} from '../model/user.model';
import {AuthService} from '../service/auth.service';

type PermissionKey = keyof PermissionSet;

@Directive({
    standalone: true,
    selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnDestroy {
    private subscription: Subscription | null = null;
    private currentPermissions: PermissionSet | null = null;

    @Input('appHasPermission') set permissionArgs(value: [PermissionKey, (boolean | number)?, string?, string?]) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.authService.currentUser.subscribe(user => {
            this.currentPermissions = user?.permissions || null;
            console.log("checking permissions:")
            console.log(this.currentPermissions)
            const [permission, expected, param1, param2] = value; // Extract values safely

            if (this.checkPermission(permission, expected, param1, param2)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }

    constructor(
        private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    private checkPermission(
        permission: PermissionKey,
        expected: boolean | number = true,
        param1?: string,
        param2?: string
    ): boolean {
        if (!this.currentPermissions) {
            return false;
        }

        const perm = this.currentPermissions[permission];

        if (typeof perm === 'boolean') {
            console.log("checking boolean permission");
            console.log(perm);
            return perm === expected;
        }

        if (typeof perm === 'number') {
            return perm === expected;
        }

        if (permission === 'email_address_usage' && param1) {
            return perm[param1] === expected;
        }

        console.log(param2)

        //if (permission === 'member' && param1 && param2) {
        //    return perm[param1]?.[param2] === (expected ? 1 : 0); // Adjust logic as needed
        //}

        return false;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
