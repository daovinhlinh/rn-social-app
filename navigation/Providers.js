import React from 'react';

import {AuthProvider} from './AuthProvider';
import {Route} from './Route';

export const Providers = () => {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
};
