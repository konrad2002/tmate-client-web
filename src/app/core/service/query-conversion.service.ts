import {Injectable} from '@angular/core';
import {BSONDocument, QueryConditionNodeModel, QueryProjectionModel, QuerySortingModel} from '../model/query.model';
import {FieldModel} from '../model/field.model';

@Injectable({
    providedIn: 'root'
})
export class QueryConversionService {

    constructor() {
    }

    projectionTsToBson(projection: QueryProjectionModel[]): BSONDocument {
        return {} as BSONDocument;
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


    conditionTsToBson(condition: QueryConditionNodeModel): BSONDocument {
        return {} as BSONDocument;
    }

    conditionBsonToTs(document: BSONDocument): QueryConditionNodeModel {
        return {} as QueryConditionNodeModel;
    }


    sortingTsToBson(sorting: QuerySortingModel[]): BSONDocument {
        return {} as BSONDocument;
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
