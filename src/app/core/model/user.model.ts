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
}
