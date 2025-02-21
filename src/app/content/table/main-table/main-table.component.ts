import {Component, OnInit} from '@angular/core';
import {FieldModel} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss',
  standalone: false
})
export class MainTableComponent implements OnInit {
    fields: FieldModel[] = [];

    constructor(
        private fieldService: FieldService
    ) {
    }

    ngOnInit() {
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
            }
        })
    }

}
