import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListDialogComponent} from './user-list-dialog.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('UserListDialogComponent', () => {
    let component: UserListDialogComponent;
    let fixture: ComponentFixture<UserListDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserListDialogComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserListDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
