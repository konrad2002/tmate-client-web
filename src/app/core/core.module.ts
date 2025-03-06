import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        provideHttpClient(
            withInterceptorsFromDi()
        )
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() core:CoreModule ){
        if (core) {
            throw new Error("You should import core module only in the root module")
        }
    }
}
