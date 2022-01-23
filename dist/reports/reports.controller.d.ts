import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/models/user.entity';
import { AproveReportDto } from "./dto/approve-report.dto";
import { GetEstimateReportDto } from './dto/get-estimate-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto, user: User): Promise<import("./models/report.entity").Report>;
    approveReport(id: string, approveReportDto: AproveReportDto, user: User): Promise<import("./models/report.entity").Report>;
    getEstimate(query: GetEstimateReportDto): Promise<any[]>;
}
