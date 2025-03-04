import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {LayoutModule} from './shared/layout/layout.module';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {CoreModule} from './core/core.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './core/interceptor/token.interceptor';


@NgModule({
    declarations: [
        AppComponent
    ],
    exports: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        RouterModule.forRoot(routes, { useHash: true }),
        RouterOutlet,
        CoreModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        provideAnimations()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
