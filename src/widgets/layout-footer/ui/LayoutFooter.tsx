import { Layout, Typography } from 'antd';

export const LayoutFooter = () => {
  return (
    <Layout.Footer>
      <Typography
        style={{
          // paddingTop: 4,
          // paddingBottom: 4,
          display: 'flex',
          flexDirection: 'row', // { sm: 'row' }
          justifyContent: 'space-between', // { sm: 'space-between' }
          alignItems: 'center', // { sm: 'center' }
          marginTop: 'auto',
        }}
      >
        <Typography.Text type="secondary">
          &copy; {new Date().getFullYear()} &laquo;movienest&raquo; 18+ <br />
          This website was created for educational purposes only. <br />
          All rights to the materials belong to their respective owners.
        </Typography.Text>

        <Typography.Title level={3}>movienest</Typography.Title>
      </Typography>
    </Layout.Footer>
  );
};
