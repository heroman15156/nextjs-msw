'use client';

import React, { Suspense, use } from 'react';
import { handlers } from '@/__mocks__/handlers';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/__mocks__/browser').then(async ({ default: worker }) => {
        if (
          process.env.NODE_ENV === 'production' ||
          process.env.NEXT_PUBLIC_MSW_ENABLED === 'false'
        ) {
          return;
        }

        await worker.start({
          onUnhandledRequest(request, print) {
            // Next.js 내부 요청은 무시
            if (request.url.includes('_next')) {
              return;
            }
            // API 요청이 아닌 경우 무시
            if (!request.url.includes(process.env.NEXT_PUBLIC_API_URL || '')) {
              return;
            }
            print.warning();
          },
        });

        worker.use(...handlers);

        // HMR 지원
        (module as any).hot?.dispose(() => {
          worker.stop();
        });

        // 디버깅을 위한 핸들러 목록 출력
        console.log('[MSW] Registered handlers:', worker.listHandlers());
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
