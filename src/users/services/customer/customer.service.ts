import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/Customer';
import { Repository } from 'typeorm';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAllByUserId(userId: number): Promise<Customer[]> {
    return this.customerRepository.find({ where: { user_id: userId } });
  }

  async createCustomer(userId: number, improvement: string): Promise<Customer> {
    const customer = this.customerRepository.create({ user_id: userId, improvement });
    return this.customerRepository.save(customer);
  }

  async updateCustomer(userId: number, id: number, improvement: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id, user_id: userId } });
    if (!customer) throw new NotFoundException('Customer not found or not authorized');

    customer.improvement = improvement;
    return this.customerRepository.save(customer);
  }

  async deleteCustomer(userId: number, id: number): Promise<void> {
    const result = await this.customerRepository.delete({ id, user_id: userId });
    if (result.affected === 0) throw new NotFoundException('Customer not found or not authorized');
  }
}
