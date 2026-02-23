import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(private trainer: TrainerService) {}

  @Get('members')
  @UseGuards(AuthGuard('jwt'))
  getMembers(@Request() req: any) {
    return this.trainer.getMembers(req.user.userId);
  }
}
