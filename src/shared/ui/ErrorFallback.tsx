import { Alert } from 'antd';
import React from 'react';

export const ErrorFallback = ({ error }: { error: any }) => {
  if ('status' in error && 'error' in error) {
    // FetchBaseQueryError
    return (
      <Alert
        message={`Status: ${error.status}`}
        description={error.error}
        type="error"
      />
    );
  }
  // SerializedError
  return (
    <Alert
      message="Unexpected error"
      description={error.message || 'Unknown error'}
      type="error"
    />
  );
};
