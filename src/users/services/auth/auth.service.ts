import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async registerUser(userDetails: CreateUserParams) {
    const { username, password } = userDetails;
    if (!username || !password) {
        throw new Error('Username and password are required')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
      username:username,
      password:hashedPassword
      });
      return this.userRepository.save(newUser);
    }
    
    
    async loginUser(userDetails: CreateUserParams) {
        const { username, password } = userDetails;
    if (!username || !password) {
        throw new Error('Username and password are required')
    }
    const user=await this.userRepository.findOne({
        username:username
    })
    if (!user){
        throw new Error('User not found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
        throw new Error('Invalid password')
    }
    return user;
      }
}
