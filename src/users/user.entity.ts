import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]; // Assuming you have a Post entity and a one-to-many relationship
}
