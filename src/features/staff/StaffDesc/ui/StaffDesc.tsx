import { useGetStaffQuery } from '@/shared/api/baseApi';
import { Alert, Descriptions, Space, Spin } from 'antd';
import React from 'react';

type Props = {
  id?: string;
};

export const StaffDesc: React.FC<Props> = ({ id }) => {
  const filmId = Number(id);

  const result = useGetStaffQuery(
    { filmId },
    {
      skip: !id || isNaN(filmId),
    },
  );

  let content: React.ReactNode;
  if (result.isLoading) {
    content = (
      <Spin tip="Loading content..." size="large">
        <div
          style={{
            padding: 50,
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
          }}
        />
      </Spin>
    );
  } else if (result.isError) {
    content = (
      <Alert
        message="Unexpected error"
        description="Unknown error"
        type="error"
      />
    );
  } else if (result.isSuccess) {
    content = (
      <Descriptions
        // bordered
        // layout="vertical"
        items={[
          {
            key: '1',
            span: 3,
            label: 'Directors',
            children: (
              <div>
                {result.data
                  .filter(datum => datum.professionText === 'Режиссеры')
                  .slice(0, 10)
                  .map(member => (
                    <Space key={member.nameRu}>{member.nameRu}</Space>
                  ))}
              </div>
            ),
          },
          {
            key: '2',
            span: 3,
            label: 'Starring',
            children: (
              <div>
                {result.data
                  .filter(datum => datum.professionText === 'Актеры')
                  .slice(0, 10)
                  .map(member => (
                    <Space key={member.nameRu} direction="horizontal">
                      {member.nameRu}
                    </Space>
                  ))}
              </div>
            ),
          },
        ]}
      />
    );
  }
  return <>{content}</>;
};
