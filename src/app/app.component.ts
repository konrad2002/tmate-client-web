import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'tmate-web-client';
    build = "loading build info ...";
    version = "loading version ...";
    showBuild = !environment.production;

    ngOnInit() {
        this.fetchBuild().then(r => {
            this.build = r;
        });
        this.fetchVersion().then(r => {
            this.version = r;
        });
    }

    async fetchBuild() {
        const response = await fetch("/release.txt");
        return await response.text();
    }

    async fetchVersion() {
        const response = await fetch("/version.txt");
        return await response.text();
    }

    protected readonly environment = environment;
}
