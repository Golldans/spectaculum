import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'list_rating' })
export class ListRatingSchema {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'list_id', type: 'int', nullable: false })
    listId: number;

    @Column({ name: 'user_id', type: 'int', nullable: false })
    userId: number;

    @Column({ name: 'score', type: 'int', nullable: false })
    score: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt: Date;
}
