import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
    name: "log"
})
export class LogSchema {
    @PrimaryGeneratedColumn({
        name: "id",
    })
    id: number;


    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        nullable: false,
    })
    createdAt: Date;
}