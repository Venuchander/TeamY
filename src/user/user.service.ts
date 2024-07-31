import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path if necessary
import { User, MortgageRequest } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, name: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getMortgageRequests(userId: number): Promise<MortgageRequest[]> {
    return this.prisma.mortgageRequest.findMany({
      where: { userId },
    });
  }

  // Add more methods as needed
}
