import { Typography } from 'antd';
import React from 'react';

export const ErrorMessage = () => {
  return (
    <Typography.Title type="danger">
      An error occurred while loading the data. Please try again later.
    </Typography.Title>
  );
};
