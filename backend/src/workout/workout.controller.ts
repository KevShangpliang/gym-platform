import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(private workout: WorkoutService) {}

  // trainer assigns workout
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req: any,
    @Body() body: { memberId: string; title: string; details: string },
  ) {
    return this.workout.createWorkout(
      req.user.userId,
      body.memberId,
      body.title,
      body.details,
    );
  }

  // member views workouts
  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  getMyWorkouts(@Request() req: any) {
    return this.workout.getMemberWorkouts(req.user.userId);
  }
}
