import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const PageHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <Space style={{ marginBottom: 8 }}>
      <Button
        color="primary"
        variant="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      />
      <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
    </Space>
  );
};
