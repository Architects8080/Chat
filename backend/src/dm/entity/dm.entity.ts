import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from "../../user/entity/user.entity";

@Entity('direct_message')
export class DirectMessage {
  @PrimaryGeneratedColumn()
  dmID: number;

  @Column({ nullable: false, length: 255 })
  message: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  timestamp: Date;
}

@Entity('direct_message_info')
export class DirectMessageInfo {
  @ManyToOne(() => DirectMessage, dmID => dmID.dmID, { nullable: false })
  @JoinColumn({ name: 'dmID' })
  dmID: DirectMessage;

  @ManyToOne(() => User, userID => userID.id, { primary: true, })
  @JoinColumn({ name: 'userID' })
  userID: User;

  @ManyToOne(() => User, friendID => friendID.id, { primary: true, })
  @JoinColumn({ name: 'friendID' })
  friendID: User;

  @Column({ nullable: false })
  isSender: boolean;
}