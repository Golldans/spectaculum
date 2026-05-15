import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "comment" })
export class CommentSchema {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "content", type: "text", nullable: false })
    content: string;

    @Column({ name: "user_id", type: "int", nullable: false })
    userId: number;

    @Column({ name: "movie_id", type: "int", nullable: false })
    movieId: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;
}