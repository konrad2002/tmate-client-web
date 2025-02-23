import {Injectable} from '@angular/core';
import {MemberModel} from '../model/member.model';
import {BehaviorSubject, distinctUntilChanged} from 'rxjs';
import {FieldModel} from '../model/field.model';
import {FieldService} from './api/field.service';
import {MemberService} from './api/member.service';
import {QueryModel} from '../model/query.model';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    private selectedMemberSubject: BehaviorSubject<MemberModel | undefined> = new BehaviorSubject<MemberModel | undefined>(undefined);
    public selectedMember = this.selectedMemberSubject.asObservable().pipe(distinctUntilChanged());


    private fieldsSubject: BehaviorSubject<FieldModel[] | undefined> = new BehaviorSubject<FieldModel[] | undefined>(undefined);
    public fields = this.fieldsSubject.asObservable().pipe(distinctUntilChanged());

    private membersSubject: BehaviorSubject<MemberModel[] | undefined> = new BehaviorSubject<MemberModel[] | undefined>(undefined);
    public members = this.membersSubject.asObservable().pipe(distinctUntilChanged());

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService
    ) {
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fieldsSubject.next(fields);
            }
        })

        this.memberService.getMembers().subscribe({
            next: members => {
                this.membersSubject.next(members);
            }
        })
    }

    runQuery(query: QueryModel) {
        this.memberService.getMembersUsingQuery(query).subscribe({
            next: members => {
                this.membersSubject.next(members)
            },
            error: err => {
                console.log(err);
            }
        })
    }

    setSelectedMember(member: MemberModel) {
        this.selectedMemberSubject.next(member);
    }

    unselectMember() {
        this.selectedMemberSubject.next(undefined);
    }
}
