import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider<T extends ObjectLiteral> {
  public async paginateQuery(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    return await repository.find({
      skip: ((paginationQuery.page ?? 1) - 1) * (paginationQuery.limit ?? 0),
      take: paginationQuery.limit,
    });
  }
}
