import { IsString, IsNumber, IsLatitude, Min, MAX, Max, IsLongitude } from "class-validator"


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
    readonly milage: number

    @IsLongitude()
    readonly lng: number

    @IsLatitude()
    readonly lat: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly price: number
}

