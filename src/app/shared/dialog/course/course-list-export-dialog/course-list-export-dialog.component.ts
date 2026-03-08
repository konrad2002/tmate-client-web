import {AfterViewInit, Component, Inject, inject, ViewChild} from '@angular/core';
import {CourseModel} from '../../../../core/model/course.model';
import {MemberService} from '../../../../core/service/api/member.service';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatOption} from '@angular/material/autocomplete';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../../../elements/spinner/spinner.component';
import {MatSelect} from '@angular/material/select';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {FieldService} from '../../../../core/service/api/field.service';
import {MemberModel} from '../../../../core/model/member.model';
import {FieldModel} from '../../../../core/model/field.model';
import {CourseSelectionComponent} from '../../../../content/course/course-selection/course-selection.component';
import {formatDate} from '@angular/common';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {MatIcon} from '@angular/material/icon';

export interface CourseListExportDialogData {
    course?: CourseModel
}

export interface CourseListExportTypeData {
    type: CourseListExportType;
    displayName: string;
    columns: string[];
}

export enum CourseListExportType {
    PARTICIPANTS = "PARTICIPANTS",
    ATTENDANCE = "ATTENDANCE"
}

export interface CourseAttendanceListExportConfig {
    units: number,
    extraColumns: number;
}

export interface CourseListExportConfig {
    fontSize: number;
}

interface CourseListDisplayColumn {
    key: string;
    header: string;
    isNoCollapse?: boolean;
}

@Component({
    selector: 'app-course-list-export-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        ReactiveFormsModule,
        MatDialogClose,
        FormsModule,
        MatSelect,
        MatStepper,
        MatStep,
        MatStepperNext,
        SpinnerComponent,
        MatStepperPrevious,
        CourseSelectionComponent,
        MatIcon
    ],
    templateUrl: './course-list-export-dialog.component.html',
    styleUrl: './course-list-export-dialog.component.scss'
})
export class CourseListExportDialogComponent implements AfterViewInit {
    private memberService: MemberService = inject(MemberService);
    private fieldService: FieldService = inject(FieldService);

    generatingList = 0;

    selectedCourse?: CourseModel;

    selectedListType: CourseListExportTypeData;

    listTypes: CourseListExportTypeData[] = [
        {
            type: CourseListExportType.PARTICIPANTS,
            displayName: "Teilnehmerliste",
            columns: ["vorname", "nachname", "strasse", "nr", "plz", "wohnort", "geburtsdatum", "telefon_1", "telefon_2", "parents"],
        },
        {
            type: CourseListExportType.ATTENDANCE,
            displayName: "Anwesenheitsliste",
            columns: ["vorname", "nachname"]
        }
    ];

    listExportConfig: CourseListExportConfig = {
        fontSize: 10
    }

    attendanceListExportConfig: CourseAttendanceListExportConfig = {
        units: 8,
        extraColumns: 4,
    }

    @ViewChild('stepper') stepper!: MatStepper;

    members: MemberModel[] = [];
    fields: Map<string, FieldModel> = new Map<string, FieldModel>();

    constructor(
        public dialogRef: MatDialogRef<CourseListExportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CourseListExportDialogData,
    ) {
        if (this.data.course) {
            this.selectedCourse = this.data.course;
        }

        this.selectedListType = this.listTypes[0];
    }

    ngAfterViewInit() {
        if (this.data.course) {
            this.stepper.selectedIndex = 1;
        }
    }

    getRangeArray(i: number): number[] {
        return new Array(i).fill(0).map((x, index) => index+1);
    }

    onExportCourseList() {
        if (!this.selectedCourse) return;
        this.exportCourseList();
        this.stepper.next();
    }

    onDownloadPdf() {
        if (!this.selectedListType) return;

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const title = this.getPdfTitle();
        doc.setFontSize(16);
        doc.text(title, 12, 14);

        autoTable(doc, {
            startY: 20,
            head: [this.getPdfHeaders()],
            body: this.getPdfRows(),
            theme: 'grid',
            tableWidth: 'auto',
            margin: {left: 8, right: 8},
            styles: {
                fontSize: this.listExportConfig.fontSize,
                cellPadding: 1.5,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [245, 245, 245],
                textColor: 20,
                fontStyle: 'bold'
            },
            rowPageBreak: 'auto'
        });

        doc.save(`${this.getExportFileBaseName()}.pdf`);
    }

    onDownloadExcel() {
        if (!this.selectedListType) return;

        const headers = this.getPdfHeaders();
        const rows = this.getPdfRows();
        const title = this.getPdfTitle();

        const sheetData: string[][] = [
            [title],
            [],
            headers,
            ...rows
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        worksheet['!cols'] = headers.map(() => ({wch: 18}));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Kursliste');
        XLSX.writeFile(workbook, `${this.getExportFileBaseName()}.xlsx`);
    }

    exportCourseList() {
        this.generatingList++;
        setTimeout(() => {
            this.generatingList--;
        }, 1000) // Simulate loading time for better UX

        this.generatingList++;
        this.memberService.getMembersByCourse(this.selectedCourse!.id).subscribe({
            next: members => {
                this.members = members;
                this.generatingList--;
            }, error: error => {
                console.log("Error exporting course list", error);
                this.generatingList--;
            }
        })

        this.generatingList++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields.map(f => [f.name, f] as [string, FieldModel]).reduce((map, obj) => map.set(obj[0], obj[1]), new Map<string, FieldModel>());
                this.generatingList--;
            }, error: error => {
                console.log("Error fetching fields for course list export", error);
                this.generatingList--;
            }
        })
    }

    protected readonly CourseListExportType = CourseListExportType;

    getParentNames(member: MemberModel) {
        const p1 = (member.data["vorname_1_gesetzl_v"] ?? "") + " " + (member.data["nachname_1_gesetzl_v"] ?? "");
        const p2 = (member.data["vorname_2_gesetzl_v"] ?? "") + " " + (member.data["nachname_2_gesetzl_v"] ?? "");
        return [p1, p2].filter(name => name.trim() !== "").join(", ");
    }

    protected getDisplayColumns(): CourseListDisplayColumn[] {
        const columns: CourseListDisplayColumn[] = this.selectedListType.columns.map(col => ({
            key: col,
            header: col === 'parents' ? 'Eltern' : (this.fields.get(col)?.display_name ?? col)
        }));

        if (this.selectedListType.type === CourseListExportType.ATTENDANCE) {
            for (const i of this.getRangeArray(this.attendanceListExportConfig.units)) {
                columns.push({
                    key: `attendance-unit-${i}`,
                    header: `UE ${i}`,
                    isNoCollapse: true
                });
            }

            for (const i of this.getRangeArray(this.attendanceListExportConfig.extraColumns)) {
                columns.push({
                    key: `attendance-extra-${i}`,
                    header: `${i}`,
                    isNoCollapse: true
                });
            }
        } else if (this.selectedListType.type === CourseListExportType.PARTICIPANTS) {
            columns.push({
                key: 'other',
                header: 'Sonstiges',
                isNoCollapse: true
            });
            columns.push({
                key: 'amount',
                header: 'Betrag',
                isNoCollapse: true
            });columns.push({
                key: 'signature',
                header: 'Signum',
                isNoCollapse: true
            });
        }

        return columns;
    }

    protected getCellText(member: MemberModel, column: CourseListDisplayColumn): string {
        if (column.key.startsWith('attendance-unit-') || column.key.startsWith('attendance-extra-')) {
            return '';
        }

        return this.getCellValue(member, column.key);
    }

    private getPdfHeaders(): string[] {
        return this.getDisplayColumns().map(column => column.header);
    }

    private getPdfRows(): string[][] {
        const columns = this.getDisplayColumns();
        return this.members.map(member => columns.map(column => this.getCellText(member, column)));
    }

    private getCellValue(member: MemberModel, col: string): string {
        if (col === 'parents') {
            return this.getParentNames(member);
        }

        const fieldName = this.fields.get(col)?.name ?? '';
        const rawValue = fieldName ? member.data[fieldName] : '';

        if (col === 'geburtsdatum' && rawValue) {
            try {
                return formatDate(rawValue, 'd.M.y', 'de-DE');
            } catch {
                return String(rawValue);
            }
        }

        return rawValue == null ? '' : String(rawValue);
    }

    private getPdfTitle(): string {
        const courseName = this.selectedCourse?.name ? ` - ${this.selectedCourse.name}` : '';
        return `${this.selectedListType.displayName}${courseName}`;
    }

    private getExportFileBaseName(): string {
        const safeName = (this.selectedCourse?.name ?? 'kursliste')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-_]/g, '');

        return `${this.selectedListType.displayName.toLowerCase()}-${safeName || 'kursliste'}`;
    }
}
