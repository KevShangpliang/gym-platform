import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  async createWorkout(
    trainerId: string,
    memberId: string,
    title: string,
    details: string,
  ) {
    // verify trainer exists
    const trainer = await this.prisma.user.findUnique({
      where: { id: trainerId },
    });

    if (!trainer || !trainer.gymId) {
      throw new Error('Invalid trainer');
    }

    // verify member belongs to same gym
    const member = await this.prisma.user.findUnique({
      where: { id: memberId },
    });

    if (!member || member.gymId !== trainer.gymId) {
      throw new Error('Member not in your gym');
    }

    const workout = await this.prisma.workout.create({
      data: {
        title,
        details,
        memberId,
        trainerId,
      },
    });

    return workout;
  }

  async getMemberWorkouts(memberId: string) {
    return this.prisma.workout.findMany({
      where: { memberId },
    });
  }
}
