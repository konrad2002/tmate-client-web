import {Component, Inject, OnInit} from '@angular/core';
import {
    QueryConditionNodeModel,
    QueryModel,
    QueryProjectionModel,
    QuerySortingModel
} from '../../../core/model/query.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {QueryEditorComponent} from '../../../content/query-editor/query-editor.component';
import {QueryService} from '../../../core/service/api/query.service';
import {QueryConversionService} from '../../../core/service/query-conversion.service';
import {FieldModel} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';
import {PartialObserver} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgIf} from '@angular/common';
import {MiscDialogService} from '../../../core/service/dialog/misc-dialog.service';

export interface QueryEditorDialogData {
    query: QueryModel;
    edit: boolean;
}
@Component({
    selector: 'app-query-editor-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        QueryEditorComponent,
        NgIf
    ],
    templateUrl: './query-editor-dialog.component.html',
    styleUrl: './query-editor-dialog.component.scss',
    standalone: true,
})
export class QueryEditorDialogComponent implements OnInit {

    fields: FieldModel[] = [];

    projections: QueryProjectionModel[] = [];
    condition: QueryConditionNodeModel = { logicalExpression: "$and", conditions: [] } as QueryConditionNodeModel
    sortings: QuerySortingModel[] = [];

    fetching = 0;

    constructor(
        public dialogRef: MatDialogRef<QueryEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: QueryEditorDialogData,
        private snackBar: MatSnackBar,
        private queryService: QueryService,
        private fieldService: FieldService,
        private queryConversionService: QueryConversionService,
        private miscDialogService: MiscDialogService
    ) {
        if (!this.data.edit) {
            this.data.query = {} as QueryModel;
        }
    }

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe(fields => {
            this.fields = fields;
            if (this.data.edit) {
                this.projections = this.queryConversionService.projectionBsonToTs(this.data.query.projection, fields);
                this.sortings = this.queryConversionService.sortingBsonToTs(this.data.query.sort, fields);
                if (this.data.query.filter) {
                    this.condition = this.queryConversionService.conditionBsonToTs(this.data.query.filter, fields);
                }
            } else {
                this.projections = this.fields.map(field => { return {field: field, project: false} as QueryProjectionModel})
            }
            this.fetching--;
        })
        // TODO: fetch query again from service by id
    }

    saveQuery() {
        // TODO
        this.data.query.projection = this.queryConversionService.projectionTsToBson(this.projections)
        this.data.query.sort = this.queryConversionService.sortingTsToBson(this.sortings)
        this.data.query.filter_json = this.queryConversionService.conditionTsToBson(this.condition, this.fields);

        if (this.data.edit) {
            this.queryService.updateQuery(this.data.query).subscribe(this.handleAfterSave)
        } else {
            this.queryService.addQuery(this.data.query).subscribe(this.handleAfterSave);
        }
    }

    handleAfterSave: PartialObserver<QueryModel> = {
        next: query => {
            this.snackBar.open("Abfrage erfolgreich gespeichert!");
            this.dialogRef.close(query);
        },
        error: _ => {
            this.snackBar.open("Fehler beim Speichern der Abfrage!");
        }
    }

    deleteQuery() {
        // TODO: confirm with popup
        this.miscDialogService.startDeletionDialog().afterClosed().subscribe(del => {
            if (del) {
                this.queryService.removeQueryById(this.data.query.id).subscribe({
                    next: query => {
                        this.snackBar.open("Abfrage erfolgreich gelöscht!");
                        this.dialogRef.close(query);
                        this.queryService.fetchQueries();
                    },
                    error: _ => {
                        this.snackBar.open("Fehler beim Löschen der Abfrage!");
                    }
                })
            }
        })
    }
}
