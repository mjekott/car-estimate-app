import { Transform } from "class-transformer"
import { IsString, IsNumber, IsLatitude, Min, MAX, Max, IsLongitude } from "class-validator"


export class GetEstimateReportDto {
    @IsString()
    readonly make: string

    @IsString()
    readonly model: string

    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(1930)
    @Max(2050)
    readonly year: number


    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly milage: number


    @Transform(({ value }) => +value)
    @IsLongitude()
    readonly lng: number

    @Transform(({ value }) => +value)
    @IsLatitude()
    readonly lat: number

    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly price: number
}

