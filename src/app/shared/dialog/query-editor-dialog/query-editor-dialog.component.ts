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
        QueryEditorComponent
    ],
    templateUrl: './query-editor-dialog.component.html',
    styleUrl: './query-editor-dialog.component.scss',
    standalone: true,
})
export class QueryEditorDialogComponent implements OnInit {

    fields: FieldModel[] = [];

    projections: QueryProjectionModel[] = [];
    condition: QueryConditionNodeModel = { logicalExpression: "and", conditions: [] } as QueryConditionNodeModel
    sortings: QuerySortingModel[] = [];

    fetching = 0;

    constructor(
        public dialogRef: MatDialogRef<QueryEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: QueryEditorDialogData,
        private queryService: QueryService,
        private fieldService: FieldService,
        private queryConversionService: QueryConversionService
    ) {}

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe(fields => {
            this.fields = fields;
            this.projections = this.queryConversionService.projectionBsonToTs(this.data.query.projection, fields);
            this.sortings = this.queryConversionService.sortingBsonToTs(this.data.query.sort, fields);
            this.fetching--;
        })
        // TODO: fetch query again from service by id
    }

    saveQuery() {
        // TODO
    }
}
