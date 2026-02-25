import {Component, Input} from '@angular/core';
import {FieldModel} from '../../../core/model/field.model';
import {FormGroup, FormModel} from '../../../core/model/form.model';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-form-editor',
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatIcon,
        MatIconButton,
        MatButton
    ],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {
    @Input() fields?: FieldModel[];

    @Input() form!: FormModel;

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
}
