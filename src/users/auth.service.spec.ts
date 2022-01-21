import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from './models/user';


jest.mock("bcryptjs", () => ({
    compare: (a, b) => a == b,
    hash: (a, b) => a
}))



let credentials = { email: "mail@gmail.com", password: "test1234" }

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService;

    beforeEach(async () => {

        fakeUserService = {
            create: jest.fn(),
            find: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUserService
            }],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    describe("Signup", () => {

        it('shoild create a new user with hashed password', async () => {
            fakeUserService.create.mockReturnValue({ id: 1, email: credentials.email, password: 'sasssss' });

            const user = await service.signup(credentials.email, credentials.password)


            expect(user.password).not.toEqual(credentials.password)

        })

        it('should throw an error if user email already exist', async () => {
            fakeUserService.find.mockResolvedValue({ id: 1, email: credentials.email })
            try {
                await service.signup(credentials.email, credentials.password)

            } catch (error) {
                return Promise.resolve()
            }
        })

    })

    describe("Signin", () => {

        it('should throw an error if user email doesnt exist ', async () => {
            try {
                await service.signin(credentials.email, credentials.password)

            } catch (error) {
                return Promise.resolve()
            }
        })


        it('should throw am error if password provided is wrong', async () => {
            fakeUserService.find.mockResolvedValue({ id: 1, email: credentials.email, password: "sffjjfjffj" })
            try {
                await service.signin(credentials.email, credentials.password)

            } catch (error) {
                return Promise.resolve()
            }
        })

        it('should return a user if correct password is provided', async () => {
            fakeUserService.find.mockResolvedValue({ id: 1, email: credentials.email, password: credentials.password })

            const user = await service.signin(credentials.email, credentials.password)

            expect(user).toBeDefined()
        })
    })

});
