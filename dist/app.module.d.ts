import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
export declare class AppModule implements NestModule {
    private configSerivce;
    constructor(configSerivce: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
