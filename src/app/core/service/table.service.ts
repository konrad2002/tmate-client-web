import {EventEmitter, Injectable} from '@angular/core';
import {MemberModel} from '../model/member.model';
import {BehaviorSubject, distinctUntilChanged, PartialObserver} from 'rxjs';
import {FieldModel} from '../model/field.model';
import {FieldService} from './api/field.service';
import {MemberService} from './api/member.service';
import {QueryModel, QuerySortingModel} from '../model/query.model';
import {ConfigService} from './api/config.service';
import {QueryResultDto} from '../model/query-result-dto.model';

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

    private querySubject: BehaviorSubject<QueryModel | undefined> = new BehaviorSubject<QueryModel | undefined>(undefined);
    public query  = this.querySubject.asObservable().pipe(distinctUntilChanged());

    private fetchingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public fetching  = this.fetchingSubject.asObservable().pipe(distinctUntilChanged());

    private dirtySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public dirty  = this.dirtySubject.asObservable().pipe(distinctUntilChanged());

    saveTableEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService,
        private configService: ConfigService
    ) {
        this.configService.getConfig().subscribe(config => {
            this.memberService.getMembersUsingQuery(config.default_query).subscribe(this.handleQueryResult);
        })
    }

    // executes a given query using the provided ID.
    // If no query is given, the previously executed query is used
    runQuery(query?: QueryModel, sorting?: QuerySortingModel) {
        if (!query) query = this.querySubject.getValue()
        if (!query) return;
        this.fetchingSubject.next(true);
        this.memberService.getMembersUsingQuery(query.id, sorting).subscribe(this.handleQueryResult)
    }

    setSelectedMember(member: MemberModel) {
        this.selectedMemberSubject.next(member);
    }

    setDirty(state: boolean) {
        this.dirtySubject.next(state);
    }

    unselectMember() {
        this.selectedMemberSubject.next(undefined);
    }

    handleQueryResult: PartialObserver<QueryResultDto> = {
        next: result => {
            this.membersSubject.next(result.members)
            this.fieldsSubject.next(result.fields)
            this.querySubject.next(result.query)
            this.setDirty(false);
            this.unselectMember();
            this.fetchingSubject.next(false);
        },
        error: err => {
            console.log(err);
            this.fetchingSubject.next(false);
        }
    }
}
