import { z } from 'zod';
import { AUTH_VALIDATION } from '@/contatns/validation';

const authSchema = z.object({
  // 이메일 스키마
  email: z
    .string()
    .min(1, { message: AUTH_VALIDATION.EMAIL_REQUIRED })
    .email({ message: AUTH_VALIDATION.INVALID_EMAIL }),

  // 비밀번호 스키마
  password: z
    .string()
    .min(1, { message: AUTH_VALIDATION.PASSWORD_REQUIRED })
    .min(6, { message: AUTH_VALIDATION.PASSWORD_MIN_LENGTH })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, {
      message: AUTH_VALIDATION.PASSWORD_PATTERN,
    }),
});

type LoginType = z.infer<typeof authSchema>;

export { authSchema };
export type { LoginType };
