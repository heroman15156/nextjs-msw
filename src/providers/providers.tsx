'use client';

import React from 'react';
import { MSWProvider } from './MSWProviders';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MSWProvider>{children}</MSWProvider>;
}
