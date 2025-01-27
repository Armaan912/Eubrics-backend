import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { SubImprovement } from './SubImprovement';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @OneToMany(() => Customer, (customer) => customer.user_id)
  customers: Customer[];

  @OneToMany(() => SubImprovement, (subimprovement) => subimprovement.user_id)
  subImprovements: SubImprovement[];
}
