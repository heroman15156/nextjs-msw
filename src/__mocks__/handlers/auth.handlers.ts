import { HttpResponse, http } from 'msw';
import { API_URL } from '@/contatns/api';
export type LoginRequest = {
  email: string;
  password: string;
};

export const authHandlers = [
  http.post<never, LoginRequest>(`/auth/login`, async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
      return HttpResponse.json(
        {
          message: 'Email and password are required',
          data: { success: false },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        message: 'Login successful',
        data: { success: true },
      },
      { status: 200 }
    );
  }),
];
