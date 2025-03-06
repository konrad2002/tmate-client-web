export interface UserModel {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    active: boolean;
    temp_password: boolean;
    logins: number;
    permissions: PermissionSet;
}

export interface PermissionSet {
    user_management: boolean;
    table_structure_management: boolean;
    email_address_management: boolean;
    bypass_email_regex: boolean;
    query_management: boolean;

    email_address_usage: Record<string, boolean>;

    member_admin: 0 | 1 | 2 | 3;
    member: Record<string, Record<string, 0 | 1 | 2 | 3>>;
}
