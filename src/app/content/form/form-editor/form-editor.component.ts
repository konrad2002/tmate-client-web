import {Component, Input} from '@angular/core';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {FormDefaults, FormGroup, FormModel} from '../../../core/model/form.model';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatChipGrid, MatChipInput, MatChipRow, MatChipsModule} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSelect} from '@angular/material/select';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-form-editor',
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatIcon,
        MatIconButton,
        MatButton,
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        FormsModule,
        MatSelect,
        KeyValuePipe
    ],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {
    @Input() fields?: FieldModel[];
    @Input() form!: FormModel;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    newField = "";

    addGroup() {
        this.form.form_groups.push({
            name: "Neue Gruppe",
            fields: []
        } as FormGroup);
    }

    addField(group: FormGroup) {
        group.fields.push(this.newField);
    }

    removeField(group: FormGroup, field: string) {
        group.fields.splice(group.fields.indexOf(field), 1);
    }

    removeGroup(group: FormGroup) {
        this.form.form_groups.splice(this.form.form_groups.indexOf(group), 1);
    }

    getFieldByName(field: string): FieldModel | undefined {
        return this.fields!.find(f => {
            return f.name === field;
        });
    }

    addDefault() {
        if (!this.form.defaults) this.form.defaults = [];
        this.form.defaults.push({
            field: "",
            value: "",
        } as FormDefaults)
    }

    protected readonly Object = Object;
    protected readonly FieldType = FieldType;

    removeDefault(def: FormDefaults) {
        this.form.defaults!.splice(this.form.defaults!.indexOf(def), 1)
    }
}
