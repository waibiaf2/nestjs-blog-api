import { PostType } from './enums/post-type.enum';
import { PostStatus } from './enums/post-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.POST,
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
    nullable: false,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', // 'datetime' in mysql
    nullable: true,
  })
  publishedOn?: Date;

  // Todo: Add as separate entities using relationships
  /*@OneToMany(() => Tag, (tag) => tag.post)
  tags?: Tag[];*/

  //Todo: Add as separate entities using relationships
  //@OneToMany(() => MetaOption, /*(metaOption) => metaOption.post)
  //metaOptions?: MetaOption[];*/
}
