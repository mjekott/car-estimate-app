import { User } from '../../users/models/user.entity';
export declare class Report {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    milage: number;
    user: User;
    approved: boolean;
}
