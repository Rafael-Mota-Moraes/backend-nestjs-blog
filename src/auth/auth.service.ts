import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  doLogin(body: LoginDto) {
    console.log(body);
    return body;
  }
}
