import {toIsoDateTime} from '../misc/date';

export interface CourseModel {
    id: string;
    name: string;
    location: string;
    time: string;
    day: string;
    price: number;
    total_spots: number;
    free_spots: number;
    style: string;
    level: string;
    age: string;
    information: string;
    begin_date: Date;
    end_date: Date;
    created_at: Date;
    modified_at: Date;
}


export interface CourseModelDto {
    id: string;
    name: string;
    location: string;
    time: string;
    day: string;
    price: number;
    total_spots: number;
    free_spots: number;
    style: string;
    level: string;
    age: string;
    information: string;
    begin_date: string;
    end_date: string;
    created_at: string;
    modified_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CourseModel {
    export function fromDto(dto: CourseModelDto): CourseModel {
        return {
            ...dto,
            begin_date: new Date(dto.begin_date),
            end_date: new Date(dto.end_date),
            created_at: new Date(dto.created_at),
            modified_at: new Date(dto.modified_at),
        } as CourseModel;
    }

    export function toDto(model: CourseModel): CourseModelDto {
        return {
            ...model,
            begin_date: toIsoDateTime(model.begin_date),
            end_date: toIsoDateTime(model.end_date),
            created_at: toIsoDateTime(model.created_at),
            modified_at: toIsoDateTime(model.modified_at),
        } as CourseModelDto;
    }
}

