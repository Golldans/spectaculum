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