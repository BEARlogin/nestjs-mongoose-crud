export default class CrudTransformService {
    static transform({ options, data, req, method }: {
        options: any;
        data: any;
        req: any;
        method: string;
    }): any;
    static filter({ options, data, req, method }: {
        options: any;
        data: any;
        req: any;
        method: string;
    }): any;
    static apply(globalHandler: any, localHandler: any, data: any, req: any): any;
}
