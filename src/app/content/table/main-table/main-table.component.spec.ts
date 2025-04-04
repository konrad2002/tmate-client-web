import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainTableComponent} from './main-table.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('MainTableComponent', () => {
    let component: MainTableComponent;
    let fixture: ComponentFixture<MainTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainTableComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MainTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
