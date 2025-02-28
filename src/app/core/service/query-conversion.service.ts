import {Injectable} from '@angular/core';
import {
    BSONDocument,
    BSONElement,
    isExpression,
    isNode,
    QueryConditionExpressionModel,
    QueryConditionModel,
    QueryConditionNodeModel,
    QueryProjectionModel,
    QuerySortingModel
} from '../model/query.model';
import {FieldModel, FieldType} from '../model/field.model';

@Injectable({
    providedIn: 'root'
})
export class QueryConversionService {

    projectionTsToBson(projections: QueryProjectionModel[]): BSONDocument {
        const document: BSONDocument = [];
        for (const projection of projections) {
            if (projection.project) {
                document.push({
                    Key: "data." + projection.field.name,
                    Value: 1
                } as BSONElement)
            }
        }
        return document;
    }

    projectionBsonToTs(document: BSONDocument, fields: FieldModel[]): QueryProjectionModel[] {
        console.log("doc:", document);
        const projections: QueryProjectionModel[] = fields.map(field => { return {field: field, project: false} as QueryProjectionModel });
        for (const bsonElement of document) {
            for (const projection of projections) {
                if (projection.field.name == bsonElement.Key.replace("data.", "")) {
                    projection.project = bsonElement.Value === 1
                }
            }
        }

        console.log("proj:", projections)
        return projections;
    }


    conditionTsToBson(condition: QueryConditionNodeModel, fields: FieldModel[]): BSONDocument {
        return this.processConditionsToBson([condition], fields);
    }

    conditionBsonToTs(document: BSONDocument, fields: FieldModel[]): QueryConditionNodeModel {
        console.log("doc:", document);

        const condition = this.processBsonElementToCondition(document[0], fields);

        console.log("cond:", condition);
        return condition as QueryConditionNodeModel;
    }


    sortingTsToBson(sortings: QuerySortingModel[]): BSONDocument {
        const document: BSONDocument = [];
        for (const sorting of sortings) {
            document.push({
                Key: "data." + sorting.field.name,
                Value: sorting.direction
            } as BSONElement)
        }
        return document;
    }

    sortingBsonToTs(document: BSONDocument, fields: FieldModel[]): QuerySortingModel[] {
        console.log("doc:", document);
        const sortings: QuerySortingModel[] = [];
        for (const bsonElement of document) {
            for (const field of fields) {
                if (field.name == bsonElement.Key.replace("data.", "")) {
                    sortings.push({
                        field: field,
                        direction: bsonElement.Value
                    } as QuerySortingModel)
                }
            }
        }

        console.log("sort:", sortings)
        return sortings;
    }

    private processConditionsToBson(conditions: QueryConditionModel[], fields: FieldModel[]): BSONDocument {
        const rnd = Math.round(Math.random() * 1000);
        console.log("[" + rnd + "]: processing conditions:", conditions)
        const document: BSONDocument = [];
        for (const condition of conditions) {
            if (isExpression(condition)) {
                if (condition.field.type === FieldType.DATE) {
                    condition.comparator = new Date(condition.comparator);
                }
                document.push({
                    Key: "data." + condition.field.name,
                    Value: {Key: condition.operator, Value: condition.comparator} as BSONElement,
                } as BSONElement)
            } else if (isNode(condition)) {
                if (condition.conditions.length <= 0) return document;
                document.push({
                    Key: condition.logicalExpression,
                    Value: this.processConditionsToBson(condition.conditions, fields)
                })
            }

        }

        console.log("[" + rnd + "]: processed document:", document)

        return document
    }

    processBsonElementToCondition(bsonElement: BSONElement, fields: FieldModel[]): QueryConditionModel {
        const rnd = Math.round(Math.random() * 1000);
        console.log("[" + rnd + "]: processing bsonElement:", bsonElement)
        let condition: QueryConditionModel = {};
        if (bsonElement.Key === "$and" || bsonElement.Key === "$or" || bsonElement.Key === "$nor") {
            condition = {
                logicalExpression: bsonElement.Key,
                conditions: bsonElement.Value.map((bson: BSONElement[]) => {return this.processBsonElementToCondition(bson[0], fields)})
            } as QueryConditionNodeModel;
        } else if (bsonElement.Key.includes("data.")) {
            condition = {
                field: fields.find(field => {return field.name === bsonElement.Key.replace("data.", "")}),
                operator: bsonElement.Value[0].Key,
                comparator: bsonElement.Value[0].Value,
            } as QueryConditionExpressionModel;
        }

        console.log("[" + rnd + "]: processed condition:", condition)

        return condition;
    }

}
