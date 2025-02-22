import {MemberModel} from '../member.model';

export interface MemberEvent {
    type: "add" | "remove" | "update";
    member: MemberModel
}
