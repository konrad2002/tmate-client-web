import {Component, inject, OnInit} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FieldService} from '../../../core/service/api/field.service';
import {FieldModel} from '../../../core/model/field.model';
import {TableStructureDialogService} from '../../../core/service/dialog/table-structure-dialog.service';

@Component({
  selector: 'app-table-structure-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose
    ],
  templateUrl: './table-structure-dialog.component.html',
  styleUrl: './table-structure-dialog.component.scss'
})
export class TableStructureDialogComponent implements OnInit {
    private fieldService: FieldService = inject(FieldService)
    private tableStructureDialogService: TableStructureDialogService = inject(TableStructureDialogService)

    fields: FieldModel[] = [];

    constructor(
        public dialogRef: MatDialogRef<TableStructureDialogComponent>,
    ) {
    }

    ngOnInit() {
        this.fetchFields();
    }

    fetchFields() {
        this.fieldService.getFields().subscribe(fields => {
            this.fields = fields;
        })
    }

    createField() {
        this.tableStructureDialogService.openFieldDialog();
    }
}
