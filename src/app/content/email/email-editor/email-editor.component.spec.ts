import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailEditorComponent} from './email-editor.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('EmailEditorComponent', () => {
    let component: EmailEditorComponent;
    let fixture: ComponentFixture<EmailEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmailEditorComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmailEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
