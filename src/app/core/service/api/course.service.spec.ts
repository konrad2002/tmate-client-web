import {TestBed} from '@angular/core/testing';

import {CourseService} from './course.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('CourseService', () => {
    let service: CourseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(CourseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
