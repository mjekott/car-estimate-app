import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './models/report.entity';
import { User } from '../users/models/user.entity';
import { AproveReportDto } from './dto/approve-report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetEstimateReportDto } from './dto/get-estimate-report.dto';

@Injectable()
export class ReportsService {

  constructor(@InjectRepository(Report) private repo: Repository<Report>) { }
  async create(user: User, createReportDto: CreateReportDto) {

    const report = this.repo.create(createReportDto);
    report.user = user;
    return await this.repo.save(report)
  }

  findAll() {
    return `This action returns all reports`;
  }

  async findOne(id: number) {
    const report = await this.repo.findOne(id, { relations: ["user"] })
    if (!report) {
      throw new NotFoundException(`Report with ${id} not found`)
    }

    return report
  }

  async changeApproval(id: number, user: User, { approved }: AproveReportDto) {
    const report = await this.findOne(id);
    report.approved = approved;
    return this.repo.save(report)
  }

  async getEtimate(@Query() estimate: GetEstimateReportDto) {
    return this.repo.createQueryBuilder().select('AVG(price)', 'price').where('make =:make', { make: estimate.make })
      .andWhere('model = :model', { model: estimate.model })
      .andWhere('lng -:lng BETWEEN -5 AND 5', { lng: estimate.lng })
      .andWhere("lat -:lat BETWEEN -5 AND 5", { lat: estimate.lat }).
      andWhere("year  -:year BETWEEN -3 AND 3", { year: estimate.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(milage - :milage)', 'DESC').setParameters({ milage: estimate.milage }).limit(3).getRawMany()
  }
}
