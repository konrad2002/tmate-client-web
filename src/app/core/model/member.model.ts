export interface MemberModel {
    id: string;
    data: Record<string, any>
    dirty: Record<string, boolean>
}
