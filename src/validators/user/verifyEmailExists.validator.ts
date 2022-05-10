import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, } from 'class-validator';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class verifyEmailExistsConstraint implements ValidatorConstraintInterface {

constructor(private readonly authService: AuthService){}

  async validate(email: any, args: ValidationArguments ) {
    const user = await this.authService.verifyEmailExists(email);
    if (user)
      return false;
      return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: verifyEmailExistsConstraint,
        });
    };
}
