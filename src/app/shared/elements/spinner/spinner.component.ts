import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    imports: [
        MatProgressSpinner
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    standalone: true
})
export class SpinnerComponent {
    @Input() spinnerLayout: "text" | "centered" | "dialog" = "text";
}
