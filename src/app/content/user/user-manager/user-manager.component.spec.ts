import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserManagerComponent} from './user-manager.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('UserManagerComponent', () => {
    let component: UserManagerComponent;
    let fixture: ComponentFixture<UserManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserManagerComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
