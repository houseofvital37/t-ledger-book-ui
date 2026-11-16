export interface ResponseDTO {
    data?:any, 
    statusCode?:any,
    status?:{
        message?: string, 
        detail?:string, 
        code?:number,
    }, 
    payload?:any,
    pagination?: {
        pagination?: 'enable' | 'disable';
        page?: number,
        size?: number,
        totalElements?: number,
        numberOfElements?: number,
        totalPages?: number,
    }
}