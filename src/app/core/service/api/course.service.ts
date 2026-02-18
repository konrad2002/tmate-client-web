import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {CourseModel, CourseModelDto} from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "course/"

    constructor(
        private apiService: ApiService
    ) {
        super("CourseService")
    }

    getCourses(): Observable<CourseModelDto[]> {
        return this.apiService.get(this.API_URL, "");
    }

    getCourseById(id: number): Observable<CourseModelDto> {
        return this.apiService.get(this.API_URL, `id/${id}`);
    }

    getCourseByName(id: number): Observable<CourseModelDto> {
        return this.apiService.get(this.API_URL, `name/${id}`);
    }

    addCourse(course: CourseModel): Observable<CourseModelDto> {
        return this.apiService.post(this.API_URL, "", CourseModel.toDto(course));
    }

    updateCourse(course: CourseModel): Observable<CourseModelDto> {
        return this.apiService.put(this.API_URL, course.id, CourseModel.toDto(course));
    }

}
