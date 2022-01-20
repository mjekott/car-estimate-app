import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user';
import { SignUpDto } from './dto/signup-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }


    async create(data: SignUpDto): Promise<User> {
        const user = this.repo.create({ ...data })
        return this.repo.save(user)
    }


    async findAll(condtion) {
        return this.repo.find(condtion)
    }

    async findOne(id: number) {
        const user = this.repo.find({ id })
        if (!user) {
            throw new NotFoundException("user not found")

        }
        return user
    }

    async find(email: string) {
        return this.repo.findOne({ email })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)

        Object.assign(user, attrs)

        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)

        return this.repo.remove(user)


    }
}
