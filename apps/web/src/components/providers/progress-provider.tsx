'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#00F3FF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;
