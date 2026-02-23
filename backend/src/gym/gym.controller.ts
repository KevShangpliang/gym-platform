import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GymService } from './gym.service';
import { Get } from '@nestjs/common';
import { RolesGuard } from '../auth/roles/roles.guard';
@Controller('gyms')
export class GymController {
  constructor(private gym: GymService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() body: { name: string }) {
    const userId = req.user.userId;
    return this.gym.createGym(body.name, userId);
  }
 @Post('join')
@UseGuards(AuthGuard('jwt'))
join(@Request() req: any, @Body() body: { gymId: string }) {
  if (!body || !body.gymId) {
    throw new Error('gymId is required');
  }

  return this.gym.joinGym(body.gymId, req.user.userId);
}

@Get('members')
@UseGuards(AuthGuard('jwt'), RolesGuard)
getMembers(@Request() req: any) {
  const userId = req.user.userId;
  return this.gym.getMembers(userId);
}
@Post('add-trainer')
@UseGuards(AuthGuard('jwt'), RolesGuard)
addTrainer(@Request() req: any, @Body() body: { userId: string }) {
  const ownerId = req.user.userId;
  return this.gym.addTrainer(ownerId, body.userId);
}
@Get("trainers")
@UseGuards(AuthGuard("jwt"))
getTrainers(@Request() req: any) {
  return this.gym.getTrainers(req.user.userId);
}


}
