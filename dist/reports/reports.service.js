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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./models/report.entity");
const get_estimate_report_dto_1 = require("./dto/get-estimate-report.dto");
let ReportsService = class ReportsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(user, createReportDto) {
        const report = this.repo.create(createReportDto);
        report.user = user;
        return await this.repo.save(report);
    }
    findAll() {
        return `This action returns all reports`;
    }
    async findOne(id) {
        const report = await this.repo.findOne(id, { relations: ["user"] });
        if (!report) {
            throw new common_1.NotFoundException(`Report with ${id} not found`);
        }
        return report;
    }
    async changeApproval(id, user, { approved }) {
        const report = await this.findOne(id);
        report.approved = approved;
        return this.repo.save(report);
    }
    async getEtimate(estimate) {
        return this.repo.createQueryBuilder().select('AVG(price)', 'price').where('make =:make', { make: estimate.make })
            .andWhere('model = :model', { model: estimate.model })
            .andWhere('lng -:lng BETWEEN -5 AND 5', { lng: estimate.lng })
            .andWhere("lat -:lat BETWEEN -5 AND 5", { lat: estimate.lat }).
            andWhere("year  -:year BETWEEN -3 AND 3", { year: estimate.year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(milage - :milage)', 'DESC').setParameters({ milage: estimate.milage }).limit(3).getRawMany();
    }
};
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_estimate_report_dto_1.GetEstimateReportDto]),
    __metadata("design:returntype", Promise)
], ReportsService.prototype, "getEtimate", null);
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map