import { Injectable } from '@nestjs/common';
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
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    const results = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  findAll = () => {
    return this.tagRepository.find();
  };

  async delete(id: number) {
    await this.tagRepository.delete(id);
    return {
      deleted: true,
      id: id,
    };
  }
}
