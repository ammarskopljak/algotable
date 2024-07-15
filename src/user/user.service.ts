import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { QueryDto } from './dto/query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: QueryDto) {
    try {
      const { page, pageSize, field, sort, column, value, operator } = query;

      const where: Prisma.UserWhereInput = {};

      if (column && operator && value) {
        if (column === 'id' || column === 'age') {
          where[column] = { [operator]: Number(value) };
        } else {
          where[column] = { [operator]: value };
        }
      }

      const take = Number(pageSize);
      const skip = Number(page) * Number(pageSize);
      const total = await this.prisma.user.count({ where });
      const users = await this.prisma.user.findMany({
        skip,
        take,
        where,
        orderBy: { [field]: sort },
      });
      return { users, total };
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number) {
    try {
      const userExists = await this.prisma.user.findUnique({ where: { id } });
      if (userExists === null) {
        return {};
      }
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
