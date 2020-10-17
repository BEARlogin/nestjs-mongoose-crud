import { Model } from 'mongoose';
import { ICrudQuery } from './crud-query.decorator';
import { CrudOptionsWithModel } from './crud.interface';
export declare class CrudPlaceholderDto {
    fake?: string;
    [key: string]: any;
}
export declare class CrudController {
    model: Model<{} | any>;
    crudOptions?: CrudOptionsWithModel;
    constructor(model: Model<{} | any>, crudOptions?: CrudOptionsWithModel);
    config(req: any): Promise<any>;
    find(query: ICrudQuery, req: any): Promise<any[] | {
        [x: string]: number | any[];
    }>;
    findOne(id: string, query: ICrudQuery, req: any): import("mongoose").DocumentQuery<any, any, {}>;
    create(body: CrudPlaceholderDto, req: any): Promise<any>;
    update(id: string, body: CrudPlaceholderDto, req: any): import("mongoose").DocumentQuery<any, any, {}>;
    delete(id: string, req: any): import("mongoose").DocumentQuery<any, any, {}>;
}
