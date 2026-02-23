import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GymService {
  constructor(private prisma: PrismaService) {}

  async createGym(name: string, ownerId: string) {
    const gym = await this.prisma.gym.create({
      data: {
        name,
        ownerId,
      },
    });

    // Update user role to OWNER
    await this.prisma.user.update({
      where: { id: ownerId },
      data: { role: 'OWNER' },
    });

    return gym;
  }

  async joinGym(gymId: string, userId: string) {
    const gym = await this.prisma.gym.findUnique({
      where: { id: gymId },
    });

    if (!gym) {
      throw new Error('Gym not found');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        gymId,
        role: 'MEMBER',
      },
    });

    return user;
  }
  async getMembers(ownerId: string) {
  const gym = await this.prisma.gym.findUnique({
    where: { ownerId },
    include: {
      members: {
        select: {
          id: true,
          email: true,
          role: true,
          gymId: true,
          createdAt: true,
        },
      },
    },
  });

  if (!gym) {
    throw new Error('Gym not found for this owner');
  }

  return gym.members;
}
async addTrainer(ownerId: string, userId: string) {
  const gym = await this.prisma.gym.findUnique({
    where: { ownerId },
  });

  if (!gym) {
    throw new Error('You do not own a gym');
  }

  const trainer = await this.prisma.user.update({
    where: { id: userId },
    data: {
      role: 'TRAINER',
      gymId: gym.id, // ⭐ attach trainer to gym
    },
  });

  return trainer;
}
async getTrainers(ownerId: string) {
  const gym = await this.prisma.gym.findUnique({
    where: { ownerId },
    include: {
      members: {
        where: { role: "TRAINER" },
      },
    },
  });

  return gym?.members || [];
}


}
