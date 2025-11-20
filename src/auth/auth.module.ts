import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CommomModule } from 'src/common/commom.module';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { JtwStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    CommomModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRATION || '1d';
        if (!secret) {
          throw new InternalServerErrorException(
            'Erro interno do servidor, jwt secret não está no .env',
          );
        }
        return {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn as JwtSignOptions['expiresIn'],
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JtwStrategy],
  exports: [],
})
export class AuthModule {}
