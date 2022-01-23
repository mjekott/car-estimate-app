import { Report } from '../../reports/models/report.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    reports: Report[];
}
