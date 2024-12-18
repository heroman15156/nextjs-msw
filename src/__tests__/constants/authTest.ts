export const TEST_AUTH = {
  // 유효한 테스트 데이터
  VALID: {
    EMAIL: 'test@example.com',
    PASSWORD: 'Test123!@#',
    NAME: '홍길동',
  },
  // 유효하지 않은 테스트 데이터
  INVALID: {
    // 이메일 관련
    EMAIL: {
      WRONG_FORMAT: 'testexample.com',
      EMPTY: '',
      WITHOUT_DOMAIN: 'test@',
      SPECIAL_CHARS: 'test!@example.com',
    },

    // 비밀번호 관련
    PASSWORD: {
      TOO_SHORT: '12345', // 최소 길이 미달
      NO_SPECIAL_CHAR: 'Test123', // 특수문자 없음
      NO_NUMBER: 'Test!@#', // 숫자 없음
      NO_UPPERCASE: 'test123!@#', // 대문자 없음
      EMPTY: '',
    },

    // 이름 관련
    NAME: {
      TOO_SHORT: '홍', // 최소 길이 미달
      TOO_LONG: '홍길동길동길동길동길동길동', // 최대 길이 초과
      WITH_SPECIAL_CHARS: '홍길동!',
      EMPTY: '',
    },
  },

  // 모의 응답 데이터
  MOCK_RESPONSE: {
    SUCCESS: {
      token: 'fake-jwt-token-for-test',
      user: {
        id: 1,
        email: 'test@example.com',
        name: '홍길동',
      },
    },
    ERROR: {
      AUTH_FAILED: {
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      },
      VALIDATION_FAILED: {
        message: '입력값이 유효하지 않습니다.',
      },
    },
  },
};
