import { IsString, IsNumber, IsLatitude, isLatitude, Min, MAX, Max, IsLongitude } from "class-validator"


export class CreateReportDto {
    @IsString()
    readonly make: string

    @IsString()
    readonly model: string

    @IsNumber()
    @Min(1930)
    @Max(2050)
    readonly year: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly mileage: number

    @IsLongitude()
    readonly lng: number

    @IsLatitude()
    readonly lat: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly price: number
}

