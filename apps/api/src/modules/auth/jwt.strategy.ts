import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '@coaching-ops/types';

/**
 * JwtStrategy
 * This strategy validates the JWT sent in the Authorization header.
 * If valid, it returns the user object which NestJS attaches to the Request.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extract the token from the "Authorization: Bearer <token>" header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use the secret defined in your apps/api/src/config/auth.config.ts
      secretOrKey: configService.get<string>('auth.secret'),
    });
  }

  /**
   * validate()
   * This method is called automatically after the JWT is successfully decoded.
   * @param payload - The decoded data from the token (sub, email, role).
   */
  async validate(payload: JWTPayload) {
    // You can add extra checks here, like verifying if the user is still active in the DB.
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token structure');
    }

    // This return value is what becomes available via @Req() req.user in your controllers.
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}