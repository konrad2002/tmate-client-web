import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarComponent} from './toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ToolbarComponent,
                MatIconModule
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
