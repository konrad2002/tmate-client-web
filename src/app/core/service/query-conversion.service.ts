import {Injectable} from '@angular/core';
import {
    BSONDocument,
    BSONElement,
    QueryConditionNodeModel,
    QueryProjectionModel,
    QuerySortingModel
} from '../model/query.model';
import {FieldModel} from '../model/field.model';

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


    conditionTsToBson(condition: QueryConditionNodeModel): BSONDocument { // eslint-disable-line
        return [];
    }

    conditionBsonToTs(document: BSONDocument): QueryConditionNodeModel {// eslint-disable-line
        return {} as QueryConditionNodeModel;
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

}
