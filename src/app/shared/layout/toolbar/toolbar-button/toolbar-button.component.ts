import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-toolbar-button',
    imports: [
        MatIcon,
        NgIf
    ],
    templateUrl: './toolbar-button.component.html',
    styleUrl: './toolbar-button.component.scss',
    standalone: true
})
export class ToolbarButtonComponent {
    @Input() disabled = false;
    @Input() label = "";
    @Input() icon = "";
    @Input() batchIcon?: string;
    @Input() batchTitle?: string;
    @Output() btn_click: EventEmitter<undefined> = new EventEmitter<undefined>();

    onClick() {
        if (!this.disabled)
            this.btn_click.next(undefined);
    }
}
