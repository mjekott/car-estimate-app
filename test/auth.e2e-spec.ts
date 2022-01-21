import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

const credentials = {
    email: "mail@mail.com",
    password: "test1234"
}

describe('Authentication (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        setupApp(app)
        await app.init();
    });

    it('/api/auth/signup', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signup')
            .send({
                email: credentials.email,
                password: credentials.password
            })
            .expect(201)
            .then(res => {
                const { id, email } = res.body
                expect(id).toBeDefined()
                expect(email).toEqual(credentials.email)
            })
    });
});
