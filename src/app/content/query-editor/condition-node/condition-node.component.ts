import {Component, Input} from '@angular/core';
import {
    isExpression,
    isNode,
    QueryConditionExpressionModel,
    QueryConditionModel,
    QueryConditionNodeModel
} from '../../../core/model/query.model';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {MatInput} from '@angular/material/input';
import {KeyValuePipe, NgIf} from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';

@Component({
    selector: 'app-condition-node',
    imports: [
        MatIcon,
        MatFormField,
        MatSelect,
        FormsModule,
        MatOption,
        MatLabel,
        MatInput,
        KeyValuePipe,
        MatMenuTrigger,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        NgIf
    ],
    templateUrl: './condition-node.component.html',
    styleUrl: './condition-node.component.scss',
    standalone: true,
})
export class ConditionNodeComponent {
    @Input() node!: QueryConditionNodeModel
    @Input() fields!: FieldModel[];


    protected readonly FieldType = FieldType;

    addExpressionChild() {
        this.node.conditions.push({field: {} as FieldModel, operator: "eq", comparator: undefined} as QueryConditionModel)
    }

    addNodeChild() {
        this.node.conditions.push({logicalExpression: "and", conditions: []} as QueryConditionModel)
    }

    removeCondition(condition: QueryConditionModel) {
        const index = this.node.conditions.indexOf(condition, 0);
        this.node.conditions.splice(index, 1);
    }

    protected readonly isNode = isNode;
    protected readonly isExpression = isExpression;
}
