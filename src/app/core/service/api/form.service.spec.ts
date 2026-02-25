import {TestBed} from '@angular/core/testing';

import {FormService} from './form.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('FormService', () => {
    let service: FormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(FormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
