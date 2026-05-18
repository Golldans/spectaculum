import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserSchema } from '../../../users/infra/schema/user.schema';

@Entity({ name: 'list_comment' })
export class ListCommentSchema {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'list_id', type: 'int', nullable: false })
    listId: number;

    @Column({ name: 'user_id', type: 'int', nullable: false })
    userId: number;

    @Column({ name: 'content', type: 'text', nullable: false })
    content: string;

    @ManyToOne(() => UserSchema)
    @JoinColumn({ name: 'user_id' })
    user?: UserSchema;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
