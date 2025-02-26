import {Component, Input, OnInit} from '@angular/core';
import {ConditionNodeComponent} from './condition-node/condition-node.component';
import {FieldModel} from '../../core/model/field.model';
import {FieldService} from '../../core/service/api/field.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {
    QueryConditionNodeModel, QueryModel,
    QueryProjectionModel,
    QuerySortingModel
} from '../../core/model/query.model';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';


@Component({
    selector: 'app-query-editor',
    imports: [
        ConditionNodeComponent,
        MatCheckbox,
        FormsModule,
        MatIconButton,
        MatIcon,
        MatSelect,
        MatOption,
        MatFormField,
        MatLabel,
        MatInput
    ],
    templateUrl: './query-editor.component.html',
    styleUrl: './query-editor.component.scss',
    standalone: true
})
export class QueryEditorComponent implements OnInit {
    @Input() fields?: FieldModel[];

    @Input() projections: QueryProjectionModel[] = [];
    @Input() condition: QueryConditionNodeModel = { logicalExpression: "and", conditions: [] } as QueryConditionNodeModel
    @Input() sortings: QuerySortingModel[] = [];

    @Input() query: QueryModel = {} as QueryModel;

    fetching = 0;

    constructor(
        private fieldService: FieldService
    ) {
    }

    ngOnInit() {
        if (!this.fields) {
            this.fetchFields();
        }
    }

    fetchFields() {
        this.fetching++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
                this.fetching--;
            },
            error: _ => {
                this.fetching--;
            }
        })
    }

    addSorting() {
        this.sortings.push({field: {} as FieldModel, direction: 0} as QuerySortingModel)
    }

}
