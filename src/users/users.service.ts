import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user';
import { SignUpDto } from './dto/signup-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }


    async create(data: any) {
        const user = this.repo.create({ ...data })
        return this.repo.save(user)
    }


    async findAll(condtion) {
        return this.repo.find(condtion)
    }

    async findOne(id: number) {
        return this.repo.find({ id })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) {
            throw new Error("user not found")
        }

        Object.assign(user, attrs)

        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new Error("user not found")
        }
        return this.repo.remove(user)


    }
}
