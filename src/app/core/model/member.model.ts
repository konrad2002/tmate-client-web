import {map, Observable} from 'rxjs';
import {QueryResultDto} from './query-result-dto.model';

export interface MemberModel {
    id: string;
    data: Record<string, any>
    dirty: Record<string, boolean>
}

function isISODateString(value: any): boolean {
    return typeof value === 'string' && (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value));
}


// helper
export function transformQueryResultObservable(source$: Observable<QueryResultDto>): Observable<QueryResultDto> {
    return source$.pipe(
        map(query => ({
            ...query,
            members: query.members.map(member=> ({
                ...member,
                data: convertDateStrings(member.data),
            } as MemberModel)),
        } as QueryResultDto))
    );
}
export function transformMembersObservable(source$: Observable<MemberModel[]>): Observable<MemberModel[]> {
    return source$.pipe(
        map(members => members.map(member=> ({
                ...member,
                data: convertDateStrings(member.data),
            } as MemberModel)),
        )
    );
}
export function transformMemberObservable(source$: Observable<MemberModel>): Observable<MemberModel> {
    return source$.pipe(
        map(member => ({
            ...member,
            data: convertDateStrings(member.data)
        }))
    );
}

function convertDateStrings(data: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in data) {
        if (isISODateString(data[key])) {
            result[key] = new Date(data[key]).toISOString().split('T')[0]; // Convert to Date object
            console.log("did date conversion!")
        } else {
            result[key] = data[key];
        }
    }
    return result;
}
