import { Flex, Grid, Skeleton } from 'antd';
import React from 'react';

const { useBreakpoint } = Grid;

export const FilmsMainSkeleton = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // anything below 768px is considered mobile

  return (
    <>
      {new Array(5).fill(null).map((_, idx) => (
        <React.Fragment key={idx}>
          <Skeleton active title={{ width: '50%' }} paragraph={false} />

          <Flex>
            {new Array(5).fill(null).map((_, idx) => (
              <Skeleton.Image
                key={idx}
                active
                style={{
                  height: isMobile ? '520px' : '352px',
                  width: isMobile ? '100%' : '230px',
                }}
              />
            ))}
          </Flex>
        </React.Fragment>
      ))}
    </>
  );
};
