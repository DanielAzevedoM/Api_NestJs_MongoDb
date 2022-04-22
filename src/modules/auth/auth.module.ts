
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7d' },
  }),
],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
