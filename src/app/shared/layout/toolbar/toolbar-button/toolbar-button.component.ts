import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-toolbar-button',
    imports: [
        MatIcon
    ],
    templateUrl: './toolbar-button.component.html',
    styleUrl: './toolbar-button.component.scss',
    standalone: true
})
export class ToolbarButtonComponent {
    @Input() disabled = false;
    @Input() label = "";
    @Input() icon = "";
    @Output() btn_click: EventEmitter<undefined> = new EventEmitter<undefined>();

    onClick() {
        if (!this.disabled)
            this.btn_click.next(undefined);
    }
}
