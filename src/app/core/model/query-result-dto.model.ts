import {MemberModel} from './member.model';
import {FieldModel} from './field.model';
import {QueryModel} from './query.model';

export interface QueryResultDto {
    members: MemberModel[];
    fields: FieldModel[];
    query: QueryModel;
}
