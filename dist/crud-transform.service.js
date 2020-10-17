"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const util_1 = require("./util");
class CrudTransformService {
    static transform({ options, data, req, method }) {
        const transformGlobal = lodash_1.get(options, `routes.global.transform`);
        const transform = lodash_1.get(options, `routes.${method}.transform`);
        return CrudTransformService.apply(transformGlobal, transform, data, req);
    }
    static filter({ options, data, req, method }) {
        const filterGlobal = lodash_1.get(options, `routes.global.filter`);
        const filter = lodash_1.get(options, `routes.${method}.filter`);
        return CrudTransformService.apply(filterGlobal, filter, data, req);
    }
    static apply(globalHandler, localHandler, data, req) {
        let resultData = data;
        if (util_1.isFunction(globalHandler)) {
            resultData = globalHandler(resultData, req);
        }
        if (util_1.isFunction(localHandler)) {
            resultData = localHandler(resultData, req);
        }
        return resultData;
    }
}
exports.default = CrudTransformService;
