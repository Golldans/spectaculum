import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
    name: "cinema"
})
export class CinemaSchema {
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
        name: "location",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    location: string;

    @Column({
        name: "start_time",
        type: "timestamp",
        nullable: false,
    })
    startTime: Date;

    @Column({
        name: "end_time",
        type: "timestamp",
        nullable: false,
    })
    endTime: Date;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp",
        nullable: true,
    })
    deletedAt?: Date;
}