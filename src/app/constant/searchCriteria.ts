export interface Pagination {
    length?: number; 
    pagination:'enable'|'disable', 
    numberOfElements:number, 
    totalElements:number, 
    page:number, 
    sort?:any,
    size:number,
    direction?:any
}

export interface PaginationDto {
    enablePagination:boolean;
    numberOfElements:number;
    page:number;
    size:number;
    totalElements:number;
    totalPages:number
}