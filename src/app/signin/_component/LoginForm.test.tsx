import LoginForm from '@/app/signin/_component/LoginForm';
import { screen } from '@testing-library/dom';
import { AUTH_VALIDATION } from '@/contatns/validation';
import { TEST_AUTH } from '@/__tests__/constants/authTest';
import { render } from '@/__tests__/helpers/testUtils';
import { formHelpers } from '@/__tests__/helpers/test-setup';

describe('LoginForm', () => {
  describe('LoginForm Email Validation', () => {
    const invalidEmailTestCases = [
      {
        scenario: '특수문자가 포함된 경우',
        email: 'test!@#$%@example.com',
        expectedError: AUTH_VALIDATION.INVALID_EMAIL,
      },
      {
        scenario: '@가 없는 경우',
        email: 'testexample.com',
        expectedError: AUTH_VALIDATION.INVALID_EMAIL,
      },
      {
        scenario: '도메인이 없는 경우',
        email: 'test@',
        expectedError: AUTH_VALIDATION.INVALID_EMAIL,
      },
      {
        scenario: '공백이 포함된 경우',
        email: 'test @ example.com',
        expectedError: AUTH_VALIDATION.INVALID_EMAIL,
      },
    ];

    test.each(invalidEmailTestCases)('$scenario - $email', async ({ expectedError, email }) => {
      const { user } = render(<LoginForm />);

      await user.type(screen.getByLabelText('이메일'), email);
      await user.click(screen.getByRole('button', { name: '로그인' }));

      expect(screen.getByText(expectedError)).toBeInTheDocument();
    });

    it('이메일이 올바른 형식이면 에러가 표시가 되지 않아야 함', async () => {
      const { user } = render(<LoginForm />);
      await user.type(screen.getByLabelText('이메일'), TEST_AUTH.VALID.EMAIL);
      await user.click(screen.getByRole('button', { name: '로그인' }));

      expect(screen.queryByText(AUTH_VALIDATION.INVALID_EMAIL)).not.toBeInTheDocument();
    });
  });

  describe('LoginForm Password Validation', () => {
    const { getPasswordInput, getSubmitButton, getErrorMessage } = formHelpers;
    const invalidPasswordTestCases = [
      {
        scenario: '비밀번호가 길이가 6미만 인 경우 ',
        password: 'pass',
        expectedError: AUTH_VALIDATION.PASSWORD_MIN_LENGTH,
      },
      {
        scenario: '숫자가 포함되지 않은경우',
        password: 'password',
        expectedError: AUTH_VALIDATION.PASSWORD_PATTERN,
      },
    ];

    test.each(invalidPasswordTestCases)(
      `$scenario-$password`,
      async ({ password, expectedError }) => {
        const { user } = render(<LoginForm />);
        await user.type(getPasswordInput(), password);
        await user.click(getSubmitButton());
        expect(screen.getByText(expectedError)).toBeInTheDocument();
      }
    );

    it('비밀번호에 아무것도 입력안했을때 에러메세지가 나타나야함', async () => {
      const { user } = render(<LoginForm />);

      await user.click(getSubmitButton());
      expect(getPasswordInput()).toHaveValue('');

      expect(getErrorMessage(AUTH_VALIDATION.PASSWORD_REQUIRED)).toBeInTheDocument();
    });
  });
});
