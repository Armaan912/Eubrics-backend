import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubImprovement } from 'src/typeorm/entities/SubImprovement';
import { CreateSubImprovementParams } from 'src/utils/types';
import { Repository } from 'typeorm';


@Injectable()
export class SubImprovementService {
  constructor(
    @InjectRepository(SubImprovement)
    private readonly subImprovementRepository: Repository<SubImprovement>,
  ) {}

  async getAllSubImprovementsByImprovementId(
    improvement_id: number,
    user_id: number,
  ): Promise<SubImprovement[]> {
    return this.subImprovementRepository.find({ where: { improvement_id, user_id } });
  }

  async createSubImprovement(params: CreateSubImprovementParams): Promise<SubImprovement> {
    const subImprovement = this.subImprovementRepository.create(params);
    return this.subImprovementRepository.save(subImprovement);
  }

  async updateSubImprovement(
    subId: number,
    description: string,
  ): Promise<SubImprovement> {
    const subImprovement = await this.subImprovementRepository.findOne({ where: { id: subId } });
    if (!subImprovement) {
      throw new NotFoundException('Sub-improvement not found');
    }
    subImprovement.description = description;
    return this.subImprovementRepository.save(subImprovement);
  }

  async deleteSubImprovement(subId: number): Promise<void> {
    const result = await this.subImprovementRepository.delete(subId);
    if (result.affected === 0) {
      throw new NotFoundException('Sub-improvement not found');
    }
  }
}
