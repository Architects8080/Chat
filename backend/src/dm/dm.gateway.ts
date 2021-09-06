import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server} from 'socket.io';
import { DmService } from './dm.service';
import { SendDMDto } from './dto/sendDM';
import { SocketUser } from 'src/socket/socket-user';
import { SocketUserService } from './socket-user.service';

@WebSocketGateway()
export class DmGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
    private readonly dmService: DmService,
    private socketUserService: SocketUserService
  ) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('DmGateway');

  async handleConnection (client: SocketUser) {
    this.logger.log(`[connected] ${client.id}`);
    try {
      const userPayload = this.jwtService.verify(`${client.handshake.query.token}`);
      const user = await this.jwtStrategy.validate(userPayload);
      client.user = user;
      this.socketUserService.addSocket(client);
    } catch (error) {
      client.disconnect(true);
    }
  }

  async handleDisconnect (client: SocketUser) {
    this.logger.log(`[disconnected] ${client.id}`);
    try {
      const userPayload = this.jwtService.verify(`${client.handshake.query.token}`);
      const user = await this.jwtStrategy.validate(userPayload);
      client.user = user;
      this.socketUserService.removeSocket(client);

    } catch (error) {}
  }

  @SubscribeMessage('dmToServer')
  async handleMessage(@MessageBody() dm: SendDMDto) {
    this.dmService.sendDM(dm);
    const newDM = { senderID: dm.userID, message: dm.message };
    const user = await this.socketUserService.getSocketById(dm.userID);
    const friend = await this.socketUserService.getSocketById(dm.friendID);
    if (user) user.emit('dmToClient', newDM);
    if (friend) friend.emit('dmToClient', newDM);
  }
}