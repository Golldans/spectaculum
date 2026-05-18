import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieSchema } from '../../../movies/infra/schema/movie.schema';
import { UserSchema } from '../../../users/infra/schema/user.schema';

@Entity({ name: "list" })
export class ListSchema {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ name: "user_id", type: "int", nullable: false })
    userId: number;

    @ManyToOne(() => UserSchema)
    @JoinColumn({ name: 'user_id' })
    user?: UserSchema;

    @ManyToMany(() => MovieSchema)
    @JoinTable({
        name: "list_movie",
        joinColumn: { name: "list_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "movie_id", referencedColumnName: "id" },
    })
    movies?: MovieSchema[];

    @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;
}