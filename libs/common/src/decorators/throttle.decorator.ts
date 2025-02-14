import { SetMetadata } from '@nestjs/common';

export interface ThrottleOptions {
  limit: number;
  ttl: number;
}

export const THROTTLE_LIMIT_KEY = 'throttle_limit';

export const Throttle = (options: ThrottleOptions) =>
  SetMetadata(THROTTLE_LIMIT_KEY, options);
