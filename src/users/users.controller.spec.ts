import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';

const credentials = {
  email: "test@mail.com",
  password: "test12345"
}

const mockRequestObject = () => {
  return createMock<Request>({
    session: {}

  });
};


describe('UsersController', () => {
  let controller: UsersController;
  let mockAuthService;
  let mockUserService;

  beforeEach(async () => {

    mockAuthService = {
      signin: jest.fn(),
      signup: jest.fn()
    }
    mockUserService = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      update: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: mockUserService
      }, {
        provide: AuthService,
        useValue: mockAuthService
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should signup a user", async () => {
    const session = { userId: -100 }
    mockAuthService.signup.mockResolvedValue({ id: 1, email: credentials.email })
    const user = await controller.signup({ email: credentials.email, password: credentials.password }, session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })

  it("should signin a user", async () => {
    const session = { userId: -100 }
    mockAuthService.signin.mockResolvedValue({ id: 1, email: credentials.email })
    const user = await controller.signin({ email: credentials.email, password: credentials.password }, session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })

  it("should signout a user", async () => {

    let req = mockRequestObject()
    await controller.signout(req)
    expect(req.session.userId).toEqual(null)
  })
  it("should return a user", async () => {

    const user = { id: 1 }
    const response = await controller.me(user)
    expect(response.id).toEqual(1)


  })

  it("should ge a user by id", async () => {
    mockUserService.findOne.mockResolvedValue({ id: 1 })
    const user = await controller.getUser("1");
    expect(user.id).toEqual(1)
  })

  it("should find all users with a particular email", async () => {
    mockUserService.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }])
    const users = await controller.findAllUsers(credentials.email);
    expect(users.length).toEqual(2)
  })

  it("should remove a user with a particular id", async () => {
    const id = "1"
    await controller.removeUser(id)
    expect(mockUserService.remove).toBeCalledTimes(1)
    expect(mockUserService.remove).toBeCalledWith(+id)

  })

  it("should update a user with a particular id", async () => {
    const id = "1"
    await controller.updateUser(id, { email: "mail@mail.com" })
    expect(mockUserService.update).toBeCalledTimes(1)
    expect(mockUserService.update).toBeCalledWith(+id, { email: "mail@mail.com" })

  })

});
