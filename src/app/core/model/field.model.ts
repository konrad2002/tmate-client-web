export interface FieldModel {
    id: string;
    name: string;
    display_name: string;
    type: FieldType;
    data: FieldData;
    nullable: boolean;
    position: number;
}

export interface FieldData {
    options: Map<string, string>;
    validator: string;
}

export enum FieldType {
    STRING = "string",
    NUMBER = "number",
    EMAIL = "email",
    SELECT = "select",
    PHONE_NUMBER = "phone_number",
    MULTI_SELECT = "multi_select",
    BOOLEAN = "boolean",
}
