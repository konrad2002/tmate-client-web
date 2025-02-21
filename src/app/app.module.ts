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
    bootstrap: [AppComponent]
})
export class AppModule {
}
