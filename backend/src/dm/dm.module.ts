import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { DirectMessage, DirectMessageInfo } from './entity/dm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessage, DirectMessageInfo])],
  controllers: [DmController],
  providers: [DmService]
})
export class DmModule {}
