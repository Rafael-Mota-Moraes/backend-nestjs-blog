import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(dto: CreateUserDto) {
    // email precisa ser unico
    const exists = await this.userRepository.exists({
      where: {
        email: dto.email,
      },
    });

    if (exists) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }
    // precisa fazer o hash de senha
    const hashedPassword = await this.hashingService.hash(dto.password);
    const newUser: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    };
    // salvar na base de dados

    const created = await this.userRepository.save(newUser);

    return created;
  }
}
