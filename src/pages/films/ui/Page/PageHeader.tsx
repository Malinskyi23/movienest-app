import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <Space>
        <Button
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Back to
        </Button>
      </Space>
      <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
    </>
  );
};
