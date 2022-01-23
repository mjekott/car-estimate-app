import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

import { AuthGuard } from '../users/auth.guard';
import { Currentuser } from 'src/users/decorators/current-user.decorator';
import { User } from '../users/models/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { AproveReportDto } from "./dto/approve-report.dto"
import { GetEstimateReportDto } from './dto/get-estimate-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  create(@Body() createReportDto: CreateReportDto, @Currentuser() user: User) {
    return this.reportsService.create(user, createReportDto);
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  approveReport(@Param('id') id: string, @Body() approveReportDto: AproveReportDto, @Currentuser() user: User) {
    return this.reportsService.changeApproval(+id, user, approveReportDto);

  }

  @Get()
  getEstimate(@Query() query: GetEstimateReportDto) {
    return this.reportsService.getEtimate(query)
  }
}