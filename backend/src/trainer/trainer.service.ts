import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  async getMembers(trainerId: string) {
    const trainer = await this.prisma.user.findUnique({
      where: { id: trainerId },
    });

    if (!trainer || !trainer.gymId) {
      throw new Error('Trainer not assigned to a gym');
    }

    const members = await this.prisma.user.findMany({
      where: {
        gymId: trainer.gymId,
        role: 'MEMBER',
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return members;
  }
}
