import {FieldModel} from './field.model';

export interface QueryModel {
    id: string;
    name: string;
    query: any;
    owner_user_id: string;
    public: boolean;
}

export interface QueryProjectionModel {
    field: FieldModel;
    project: boolean;
}

// represents a list of conditions, connected by an

export interface QueryConditionNodeModel extends QueryConditionModel {
    logicalExpression: "and" | "or" | "nor";
    conditions: QueryConditionModel[];
}

export interface QueryConditionModel {

}

export interface QueryConditionExpressionModel extends QueryConditionModel {
    field: FieldModel;
    operator: "eq" | "gt" | "gte" | "in" | "lt" | "lte" | "ne" | "nin";
    comparator: any;
}

export interface QuerySortingModel {
    field: FieldModel;
    direction: number;
}
