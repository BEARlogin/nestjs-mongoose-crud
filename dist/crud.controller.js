"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = exports.CrudPlaceholderDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_query_decorator_1 = require("./crud-query.decorator");
const crud_config_1 = require("./crud-config");
const lodash_1 = require("lodash");
const crud_transform_service_1 = require("./crud-transform.service");
class CrudPlaceholderDto {
}
exports.CrudPlaceholderDto = CrudPlaceholderDto;
class CrudController {
    constructor(model, crudOptions) {
        this.model = model;
        this.crudOptions = crudOptions;
    }
    async config(req) {
        const { config } = this.crudOptions;
        if (typeof config === 'function') {
            return config.call(this, req);
        }
        return config;
    }
    find(query = {}, req) {
        let { where = lodash_1.get(this.crudOptions, 'routes.find.where', {}), limit = lodash_1.get(this.crudOptions, 'routes.find.limit', 10), page = 1, skip = 0, populate = lodash_1.get(this.crudOptions, 'routes.find.populate', undefined), sort = lodash_1.get(this.crudOptions, 'routes.find.sort', undefined), } = query;
        if (skip < 1) {
            skip = (page - 1) * limit;
        }
        const paginateKeys = lodash_1.get(this.crudOptions, 'routes.find.paginate', crud_config_1.defaultPaginate);
        const filter = crud_transform_service_1.default.filter({
            options: this.crudOptions,
            data: where,
            req: req,
            method: 'find',
        });
        const find = async () => {
            const data = await this.model
                .find()
                .where(filter)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .populate(populate);
            if (paginateKeys !== false) {
                const total = await this.model.countDocuments(where);
                return {
                    [paginateKeys.total]: total,
                    [paginateKeys.data]: data,
                    [paginateKeys.lastPage]: Math.ceil(total / limit),
                    [paginateKeys.currentPage]: page,
                };
            }
            return data;
        };
        return find();
    }
    findOne(id, query = {}, req) {
        let { where = lodash_1.get(this.crudOptions, 'routes.findOne.where', {}), populate = lodash_1.get(this.crudOptions, 'routes.findOne.populate', undefined), select = lodash_1.get(this.crudOptions, 'routes.findOne.select', null), } = query;
        const filter = crud_transform_service_1.default.filter({
            options: this.crudOptions,
            data: where,
            req: req,
            method: 'findOne',
        });
        return this.model
            .findById(id)
            .populate(populate)
            .select(select)
            .where(filter);
    }
    create(body, req) {
        const createBody = crud_transform_service_1.default.transform({
            options: this.crudOptions,
            data: body,
            req: req,
            method: 'create',
        });
        return this.model.create(createBody);
    }
    update(id, body, req) {
        const updateBody = crud_transform_service_1.default.transform({
            options: this.crudOptions,
            data: body,
            req: req,
            method: 'update',
        });
        const filter = crud_transform_service_1.default.filter({
            options: this.crudOptions,
            data: { _id: id },
            req: req,
            method: 'update',
        });
        return this.model.findOneAndUpdate(filter, updateBody, {
            new: true,
            upsert: false,
            runValidators: true,
        });
    }
    delete(id, req) {
        const filter = crud_transform_service_1.default.filter({
            options: this.crudOptions,
            data: { _id: id },
            req: req,
            method: 'delete',
        });
        return this.model.findOneAndRemove(filter);
    }
}
__decorate([
    common_1.Get('config'),
    swagger_1.ApiOperation({ summary: 'API Config', operationId: 'config' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "config", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Find all records', operationId: 'list' }),
    swagger_1.ApiQuery({
        name: 'query',
        type: String,
        required: false,
        description: 'Query options',
    }),
    __param(0, crud_query_decorator_1.CrudQuery('query')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_query_decorator_1.ICrudQuery, Object]),
    __metadata("design:returntype", void 0)
], CrudController.prototype, "find", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: 'Find a record' }),
    __param(0, common_1.Param('id')), __param(1, crud_query_decorator_1.CrudQuery('query')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, crud_query_decorator_1.ICrudQuery, Object]),
    __metadata("design:returntype", void 0)
], CrudController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create a record' }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CrudPlaceholderDto, Object]),
    __metadata("design:returntype", void 0)
], CrudController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ summary: 'Update a record' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CrudPlaceholderDto, Object]),
    __metadata("design:returntype", void 0)
], CrudController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: 'Delete a record' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CrudController.prototype, "delete", null);
exports.CrudController = CrudController;
