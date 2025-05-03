import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from '../dtos/create-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  /**
   * The MetaOptionsService class is responsible for handling the business logic
   * related to meta-options. It interacts with the database through the
   * TypeORM repository pattern.
   *
   * @param {Repository<MetaOption>} metaOptionsRepository - The TypeORM repository for the MetaOption entity.
   */
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creates a new meta option in the database.
   *
   * @param {CreateMetaOptionsDto} createMetaOptionsDto - The data transfer object containing the details of the meta option to be created.
   * @returns {Promise<CreateMetaOptionsDto>} - A promise that resolves to the created meta option.
   */
  async create(
    createMetaOptionsDto: CreateMetaOptionsDto,
  ): Promise<CreateMetaOptionsDto> {
    const newMetaOption =
      this.metaOptionsRepository.create(createMetaOptionsDto);
    const metaOption = await this.metaOptionsRepository.save(newMetaOption);
    return new Promise((resolve) => resolve(metaOption));
  }
}
