import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { MyGateway } from './gateway/gateway';

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService, MyGateway],
})
export class CommunicationModule {}
