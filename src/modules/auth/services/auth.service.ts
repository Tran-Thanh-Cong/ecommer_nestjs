import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { AuthTokenOutputDto } from './../dtos/auth-token-output.dto';
import { OptionAuthRegister } from './../../../shared/utils/types/options-auth-register.type';
import { BcryptService } from './../../../shared/bcrypt/bcrypt.service';
import { UserRepository } from './../../users/repositories/users.repository';
import { OutputUserDto } from './../../users/dtos/output-user.dto';
import { AuthRegisterOutputDto } from './../dtos/auth-register-output.dto';
import { AuthRegisterInputDto } from './../dtos/auth-register-input.dto';
import { AUTH_PROVIDER } from '../../../shared/constants/auth-provider.constant';
import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/users.entity';
import { LoggerService } from '../../../shared/logger/logger.service';
import { ROLE } from '../constants/role.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async register(
    data: AuthRegisterInputDto & OptionAuthRegister,
  ): Promise<AuthRegisterOutputDto> {
    data.isAccountDisabled = false;
    data.isVerified = false;
    data.provider = AUTH_PROVIDER.EMAIL;
    data.role = [ROLE.USER];
    data.token = uuid();
    data.expireIn = (new Date().getTime() + 7 * 86400 * 60).toString();

    const registerUser: User = await this.usersService.createUser(data);

    return plainToClass(AuthRegisterOutputDto, registerUser, {
      excludeExtraneousValues: true,
    });
  }

  async verifyEmail(token: string) {
    try {
      const user: User = await this.usersService.findOneUser({ token: token });

      if (!user) {
        this.logger.error('user not found');
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (new Date().getTime() >= parseInt(user.expireIn)) {
        throw new HttpException(
          'Expire in verify email',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.usersService.updateUser(user.id, {
        isVerified: true,
        token: '',
        expireIn: '',
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Verify email successfuly',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(data: OutputUserDto): Promise<AuthTokenOutputDto> {
    return this.getAuthToken(data);
  }

  async getAuthToken(user: OutputUserDto): Promise<AuthTokenOutputDto> {
    try {
      const subject = { sub: user.id };
      const payload = {
        email: user.email,
        sub: user.id,
        roles: user.role,
      };

      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          { ...subject, ...payload },
          {
            expiresIn: this.configService.get<number>(
              'jwt.accessTokenExpiresInSec',
            ),
          },
        ),
        this.jwtService.signAsync(subject, {
          expiresIn: this.configService.get<number>(
            'jwt.refreshTokenExpiresInSec',
          ),
        }),
      ]);

      const authToken = {
        access_token,
        refresh_token,
      };

      return plainToClass(AuthTokenOutputDto, authToken, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(email: string, password: string): Promise<OutputUserDto> {
    const user = await this.userRepository.findOneUser({ email: email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (user.provider != AUTH_PROVIDER.EMAIL) {
      throw new HttpException(
        'Please login with email is verify',
        HttpStatus.BAD_REQUEST,
      );
    }

    const match: boolean = await this.bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpException('Password not correct', HttpStatus.BAD_REQUEST);
    }

    return plainToClass(OutputUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async refresheToken(id: number): Promise<AuthTokenOutputDto> {
    const user = await this.userRepository.findOneUser({ id: id });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    return this.getAuthToken(
      plainToClass(OutputUserDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
