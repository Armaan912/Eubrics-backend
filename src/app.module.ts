import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { AuthService } from './users/services/auth/auth.service';
import { AuthController } from './users/controllers/auth/auth.controller';
import { CustomerService } from './users/services/customer/customer.service';
import { SubImprovementService } from './users/services/subimprovement/subimprovement.service';
import { CustomerController } from './users/controllers/customer/customer.controller';
import { SubImprovementController } from './users/controllers/subimprovement/subimprovement.controller';
import { UsersService } from './users/services/users/users.service';
import { UsersController } from './users/controllers/users/users.controller';
import { Customer } from './typeorm/entities/Customer';
import { SubImprovement } from './typeorm/entities/SubImprovement';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthStrategy } from './users/controllers/auth.strategy';
import { Connection, createConnection } from 'typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: 'helloliAm',
      secretOrPrivateKey:'abcd',
      signOptions: { expiresIn: '2592000s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eubrics',
      entities: [User,Customer,SubImprovement],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User,Customer,SubImprovement]),
    
    
  ],
  controllers: [UsersController,AppController,AuthController,CustomerController,SubImprovementController],
  providers: [AppService, UsersService,
    AuthService,
    CustomerService,
    SubImprovementService,JwtService,AuthStrategy,
    {
      provide: 'DATABASE_CONNECTION', // Custom provider for TypeORM.Connection
      useFactory: async () => {
        const connection = await createConnection({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'eubrics',
          entities: [User, Customer, SubImprovement],
          synchronize: false, // Turn off in production
        });
        return connection; // Return Connection instance
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],  

})
export class AppModule {}
