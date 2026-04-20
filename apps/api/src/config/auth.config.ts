import { registerAs } from '@nestjs/config';

/**
 * AuthConfig
 * Centralized security settings for JWT and Session management.
 * Always use Environment Variables (.env) for sensitive values.
 */
export default registerAs('auth', () => ({
  /**
   * JWT Secret
   * Used to sign the tokens. In production, this must be a long, random string.
   */
  secret: process.env.JWT_SECRET || 'IIT_TOOL_DEFAULT_SECRET_FOR_DEV',

  /**
   * Token Expiration
   * '1d' = 1 day. Shorter times are more secure; 
   * long times are better for user experience.
   */
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',

  /**
   * Refresh Token Secret
   * Used to issue a new JWT without requiring the user to log in again.
   */
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'IIT_TOOL_REFRESH_SECRET_DEV',
  
  refreshExpiresIn: '7d',

  /**
   * saltRounds
   * Determines the complexity of Bcrypt password hashing.
   * 10 is the industry standard for performance vs. security.
   */
  saltRounds: 10,
}));