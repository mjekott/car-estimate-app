"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(email, password) {
        let exist = await this.usersService.find(email);
        console.log(exist);
        if (exist) {
            throw new common_1.BadRequestException('Email in use');
        }
        const newPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({ email, password: newPassword });
        return user;
    }
    async signin(email, password) {
        const user = await this.usersService.find(email);
        if (!user) {
            throw new common_1.BadRequestException("Invalid Credentials");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.BadRequestException("Invalid Credentials");
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map