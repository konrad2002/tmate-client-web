import {Injectable} from '@angular/core';
import {MemberModel} from '../model/member.model';
import {BehaviorSubject, distinctUntilChanged} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    private selectedMemberSubject: BehaviorSubject<MemberModel | undefined> = new BehaviorSubject<MemberModel | undefined>(undefined);
    public selectedMember = this.selectedMemberSubject.asObservable().pipe(distinctUntilChanged());

    setSelectedMember(member: MemberModel) {
        this.selectedMemberSubject.next(member);
    }

    unselectMember() {
        this.selectedMemberSubject.next(undefined);
    }
}
