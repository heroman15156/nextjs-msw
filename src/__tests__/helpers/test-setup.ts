import { screen } from '@testing-library/dom';

// export function renderWithProviders(ui: React.ReactElement) {
//   return render(
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>{ui}</ThemeProvider>
//       </QueryClientProvider>
//   );
// }

export const formHelpers = {
  getEmailInput: () => screen.getByLabelText('이메일'),
  getPasswordInput: () => screen.getByLabelText('비밀번호'),
  getSubmitButton: () => screen.getByRole('button', { name: '로그인' }),
  getErrorMessage: (message: string) => screen.getByText(message),
  queryErrorMessage: (message: string) => screen.queryByText(message),
};
