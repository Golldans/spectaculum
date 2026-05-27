import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
    name: "movie"
})
export class MovieSchema {
    @PrimaryGeneratedColumn({
        name: "id",
    })
    id?: number;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'cover_url',
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    coverUrl?: string;

    @Column({
        name: 'year',
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    year?: string;

    @Column({
        name: 'plot',
        type: 'text',
        nullable: true,
    })
    plot?: string;

    @Column({
        name: 'imdb_id',
        type: 'varchar',
        length: 32,
        nullable: true,
    })
    imdbId?: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        nullable: false,
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt?: Date;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp",
        nullable: true,
    })
    deletedAt?: Date;
}