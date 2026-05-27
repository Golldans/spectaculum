import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

@Entity({ name: 'friend_request' })
export class FriendRequestSchema {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'requester_id', type: 'int', nullable: false })
    requesterId: number;

    @Column({ name: 'receiver_id', type: 'int', nullable: false })
    receiverId: number;

    @Column({ name: 'status', type: 'varchar', length: 20, nullable: false, default: 'pending' })
    status: FriendRequestStatus;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt: Date;
}
