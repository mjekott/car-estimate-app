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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("./models/user");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const user = this.repo.create(Object.assign({}, data));
        return this.repo.save(user);
    }
    async findAll(condtion) {
        return this.repo.find(condtion);
    }
    async findOne(id) {
        const user = this.repo.find({ id });
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        return user;
    }
    async find(email) {
        return this.repo.findOne({ email });
    }
    async update(id, attrs) {
        const user = await this.findOne(id);
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.repo.remove(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map