import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'screening' })
export class ScreeningSchema {
    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number;

    @Column({ name: 'movie_id', type: 'int', nullable: false })
    movieId!: number;

    @Column({ name: 'cinema_id', type: 'int', nullable: false })
    cinemaId!: number;

    @Column({ name: 'exhibition_at', type: 'timestamp', nullable: false })
    exhibitionAt!: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
