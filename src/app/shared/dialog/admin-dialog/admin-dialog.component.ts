import {Component, inject} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ConfigService} from '../../../core/service/api/config.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose
    ],
  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss'
})
export class AdminDialogComponent {
    private configService: ConfigService = inject(ConfigService);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    constructor(
        public dialogRef: MatDialogRef<AdminDialogComponent>,
    ) {
    }

    initConfig() {
        this.configService.initConfig().subscribe({
            next: _ => {
                this.snackBar.open("Konfiguration wurde initialisiert.", 'OK');
            }, error: err => {
                this.snackBar.open(err.message, 'OK');
            }
        });
    }
}
