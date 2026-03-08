import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {CoreModule} from './core/core.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './core/interceptor/token.interceptor';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

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
        RouterModule.forRoot(routes, { useHash: true }),
        RouterOutlet,
        CoreModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: 'de-DE'},
        {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
        provideAnimations(),
        provideNativeDateAdapter()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
