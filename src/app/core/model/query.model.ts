import {FieldModel} from './field.model';

export interface QueryModel {
    id: string;
    name: string;
    projection: BSONDocument;
    filter: BSONDocument;
    filter_json: any;
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
    logicalExpression: "$and" | "$or" | "$nor";
    conditions: QueryConditionModel[];
}

export interface QueryConditionModel { // eslint-disable-line

}

export interface QueryConditionExpressionModel extends QueryConditionModel {
    field: FieldModel;
    operator: "$eq" | "$gt" | "$gte" | "$in" | "$lt" | "$lte" | "$ne" | "$nin";
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



export function isNode(obj: QueryConditionModel): obj is QueryConditionNodeModel {
    return 'logicalExpression' in obj;
}

export function isExpression(obj: QueryConditionModel): obj is QueryConditionExpressionModel {
    return 'operator' in obj;
}
