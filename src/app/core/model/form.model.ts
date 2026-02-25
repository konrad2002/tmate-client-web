export interface FormModel {
    id: string;
    name: string;
    form_groups: FormGroup[];
    defaults: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface FormGroup {
    name: string;
    fields: string[];
}
