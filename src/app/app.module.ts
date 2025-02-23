import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {ContentModule} from './content/content.module';
import {LayoutModule} from './shared/layout/layout.module';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {CoreModule} from './core/core.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';


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
        ContentModule,
        LayoutModule,
        RouterModule.forRoot(routes, { useHash: true }),
        RouterOutlet,
        CoreModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
