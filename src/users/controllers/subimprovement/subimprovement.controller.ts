import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
  } from '@nestjs/common';
import { CreateSubImprovementDto } from 'src/users/dtos/CreateSubImprovement.dto';
import { UpdateSubImprovementDto } from 'src/users/dtos/UpdateSubImprovement.dto';
import { SubImprovementService } from 'src/users/services/subimprovement/subimprovement.service';
import { User as UserDecorator } from '../../../decorators/user.decorator';

  
  @Controller('improvements')
  export class SubImprovementController {
    constructor(private readonly subImprovementService: SubImprovementService) {}
  
    @Get(':id/sub')
    async getAllSubImprovements(
      @Param('id') improvement_id: number,
      @UserDecorator('id') user_id,
    ) {
      if (!user_id) throw new Error('userId is required');
      return this.subImprovementService.getAllSubImprovementsByImprovementId(improvement_id, user_id);
    }
  
    @Post(':id/sub')
    async createSubImprovement(
      @Param('id') improvement_id: number,
      @UserDecorator('id') user_id,
      @Body() createSubImprovementDto: CreateSubImprovementDto,
    ) {
      if (!user_id) throw new Error('userId is required');
      return this.subImprovementService.createSubImprovement({
        improvement_id,
        user_id,
        description: createSubImprovementDto.description,
      });
    }
  
    @Put('sub/:subId')
    async updateSubImprovement(
      @Param('subId') subId: number,
      @Body() updateSubImprovementDto: UpdateSubImprovementDto,
    ) {
      return this.subImprovementService.updateSubImprovement(
        subId,
        updateSubImprovementDto.description,
      );
    }
  
    @Delete('sub/:subId')
    async deleteSubImprovement(@Param('subId') subId: number) {
      await this.subImprovementService.deleteSubImprovement(subId);
      return { message: 'Sub-improvement deleted successfully' };
    }
  }
  