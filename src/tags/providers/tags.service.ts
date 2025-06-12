import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject Tag Repository
     * */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto): Promise<Tag> {
    let tag = this.tagRepository.create(createTagDto);
    try {
      tag = await this.tagRepository.save(tag);
    } catch (exception) {
      throw new BadRequestException(exception.detail);
    }
    return tag;
  }

  public async findMultipleTags(tags: number[]) {
    let tagList: Tag[] = [];
    try {
      tagList = await this.tagRepository.find({
        where: {
          id: In(tags),
        },
      });
    } catch (exception) {
      throw new BadRequestException(
        `Error could not connect to the database ${exception}`,
      );
    }

    return tagList;
  }

  public findAll = async () => {
    let tags: Tag[] = [];

    try {
      tags = await this.tagRepository.find();
    } catch (exception) {
      throw new BadRequestException(
        `Connection to the database failed with error message:${exception}`,
      );
    }

    return tags;
  };

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return {
      deleted: true,
      id: id,
    };
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return {
      deleted: true,
      id: id,
    };
  }
}
