import { Col, Flex, Row, Skeleton } from 'antd';
import React from 'react';

const COUNT = 8;

export const SkeletonGrid = () => (
  <Row gutter={[16, 16]}>
    {Array.from({ length: COUNT }).map((_, idx) => (
      <Col key={idx} xs={24} sm={12} md={8} lg={4}>
        <Flex vertical>
          <Skeleton.Image active style={{ width: '100%', height: 200 }} />
          <Skeleton active title={false} paragraph={{ rows: 2 }} />
        </Flex>
      </Col>
    ))}
  </Row>
);
