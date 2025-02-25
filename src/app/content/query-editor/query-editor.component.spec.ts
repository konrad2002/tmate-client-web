import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QueryEditorComponent} from './query-editor.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('QueryEditorComponent', () => {
    let component: QueryEditorComponent;
    let fixture: ComponentFixture<QueryEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QueryEditorComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QueryEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
