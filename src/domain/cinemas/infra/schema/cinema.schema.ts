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
        name: 'cep',
        type: 'varchar',
        length: 8,
        nullable: true,
    })
    cep?: string;

    @Column({
        name: 'street',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    street?: string;

    @Column({
        name: 'number',
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    number?: string;

    @Column({
        name: 'neighborhood',
        type: 'varchar',
        length: 120,
        nullable: true,
    })
    neighborhood?: string;

    @Column({
        name: 'city',
        type: 'varchar',
        length: 120,
        nullable: true,
    })
    city?: string;

    @Column({
        name: 'state',
        type: 'varchar',
        length: 2,
        nullable: true,
    })
    state?: string;

    @Column({
        name: 'complement',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    complement?: string;

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