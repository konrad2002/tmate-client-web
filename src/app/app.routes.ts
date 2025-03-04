import {Routes} from '@angular/router';
import {MainComponent} from './shared/layout/main/main.component';
import {LoginGuard} from './core/guard/login.guard';
import {LoginComponent} from './shared/layout/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        component: MainComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
