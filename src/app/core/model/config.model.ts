export interface SpecialFieldsConfig {
    first_name: string;
    last_name: string;
    e_mail: string;
    e_mail_2: string;
    family: string;
    attest_date: string;
    attest_required: string;
    address: AddressFieldsConfig
}

export interface AddressFieldsConfig {
    street: string;
    number: string;
    city: string;
    postal_code: string;
}

export interface ConfigModel {
    default_query: string;
}
