import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './models/report.entity';
import { User } from '../users/models/user.entity';
import { AproveReportDto } from './dto/approve-report.dto';
import { GetEstimateReportDto } from './dto/get-estimate-report.dto';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(user: User, createReportDto: CreateReportDto): Promise<Report>;
    findAll(): string;
    findOne(id: number): Promise<Report>;
    changeApproval(id: number, user: User, { approved }: AproveReportDto): Promise<Report>;
    getEtimate(estimate: GetEstimateReportDto): Promise<any[]>;
}
