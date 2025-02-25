import {MemberModel} from './member.model';

export interface FamilyModel {
    member_count: number;
    last_name: string;
    members: MemberModel[];
}

export interface Families {
    families: Record<number, FamilyModel>
}
