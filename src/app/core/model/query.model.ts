import {FieldModel} from './field.model';

export interface QueryModel {
    id: string;
    name: string;
    projection: BSONDocument;
    filter: BSONDocument;
    sort: BSONDocument;
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

export interface QueryConditionModel { // eslint-disable-line

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


export interface BSONElement {
    Key: string;
    Value: any;
}

export type BSONDocument = BSONElement[];
