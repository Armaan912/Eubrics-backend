import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';

@Entity({ name: 'subimprovement' })
export class SubImprovement {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  improvement_id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.subImprovements, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Customer, (customer) => customer.subImprovements, {
    cascade: true,
  })
  @JoinColumn({ name: 'improvement_id' }) // Links improvement_id to the Customer entity
  customer: Customer;
}
