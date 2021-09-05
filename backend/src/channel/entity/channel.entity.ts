import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('channel')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  channelStatus: number;

  @Column()
  channelPassword: number;

  @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.channelID)
  channelIDs: ChannelMembers[];
}

@Entity('channel_members')
export class ChannelMembers {
  @ManyToOne(() => Channel, (channel) => channel.channelIDs, { primary: true })
  @JoinColumn({ name: 'channelID' })
  channelID: Channel;

  @ManyToOne(() => User, (user) => user.userIDs, { primary: true })
  @JoinColumn({ name: 'userID' })
  userID: User;

  @Column()
  permissionType: number;

  @Column()
  penalty: number;
}
