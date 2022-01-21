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

    it('recieve currently authenitcated user', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/auth/signup')
            .send({
                email: credentials.email,
                password: credentials.password
            })
            .expect(201)

        const cookie = res.get("Set-Cookie")

        const { body } = await request(app.getHttpServer())
            .get('/api/auth/me')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(credentials.email)


    });


    it('should be able to signin a user', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/auth/signup')
            .send({
                email: credentials.email,
                password: credentials.password
            })
            .expect(201)



        await request(app.getHttpServer())
            .post('/api/auth/signin')
            .send({
                email: credentials.email,
                password: credentials.password
            })
            .expect(201)
            .then((res => {
                const { email } = res.body
                expect(email).toEqual(credentials.email)
            }))



    });
});
