import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from 'src/users/services/customer/customer.service';
import { User as UserDecorator } from '../../../decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
@UseGuards(AuthGuard(['jwt']))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(@UserDecorator('id') userId) {
    if (!userId) throw new Error('userId is required');
    return this.customerService.findAllByUserId(userId);
  }

  @Post('create')
  async createCustomer(
    @UserDecorator('id') userId,
    @Body('improvement') improvement: string,
  ) {
    if (!userId || !improvement)
      throw new Error('userId and improvement are required');
    return this.customerService.createCustomer(userId, improvement);
  }

  @Put('update/:id')
  async updateCustomer(
    @Param('id') id: number,
    @UserDecorator('id') userId,
    @Body('improvement') improvement: string,
  ) {
    if (!userId || !improvement)
      throw new Error('userId and improvement are required');
    return this.customerService.updateCustomer(userId, id, improvement);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number, @UserDecorator('id') userId) {
    if (!userId) throw new Error('userId is required');
    await this.customerService.deleteCustomer(userId, id);
    return { message: 'Customer deleted successfully' };
  }
}
