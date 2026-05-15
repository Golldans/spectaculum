import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "user",
})
export class UserSchema {
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Column({ name: "username", type: "varchar", length: 100, nullable: false, unique: true })
    username!: string;

    @Column({ name: "email", type: "varchar", length: 255, nullable: false, unique: true })
    email!: string;

    @Column({ name: "password", type: "varchar", length: 255, nullable: false, select: false })
    password!: string;

    @ManyToMany(() => UserSchema)
    @JoinTable({
        name: "user_friend",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "friend_id", referencedColumnName: "id" },
    })
    friends?: UserSchema[];

    @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: false })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;
}