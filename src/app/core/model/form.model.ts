export interface FormModel {
    id: string;
    name: string;
    form_groups: FormGroup[];
    defaults?: FormDefaults[];
    special_form: "default" | "course" | undefined;
    created_at: string;
    updated_at: string;
}

export interface FormGroup {
    name: string;
    fields: string[];
}

export interface FormDefaults {
    field: string;
    value: string;
}
