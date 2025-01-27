import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { SubImprovement } from './SubImprovement';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  improvement: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;

  @OneToMany(() => SubImprovement, (subImprovement) => subImprovement.customer)
  subImprovements: SubImprovement[];
}
