import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GymModule } from './gym/gym.module';
import { TrainerModule } from './trainer/trainer.module';
import { WorkoutModule } from './workout/workout.module';


@Module({
  imports: [AuthModule, PrismaModule, GymModule, TrainerModule, WorkoutModule],
})
export class AppModule {}
