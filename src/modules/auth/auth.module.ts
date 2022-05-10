import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/user.entity';
import { verifyEmailExistsConstraint } from 'src/validators/user/verifyEmailExists.validator';
import { Adress, AdressSchema } from 'src/models/adress/adress.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Adress.name, schema: AdressSchema }]),
    UserModule, 
    PassportModule, 
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7d' },
  }),
],
  controllers:[AuthController],
  providers: [AuthService, verifyEmailExistsConstraint, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
