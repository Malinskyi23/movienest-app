import { Grid, Skeleton } from 'antd';
import React from 'react';

interface FilmImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
}

const { useBreakpoint } = Grid;

export const FilmImage = ({
  src,
  alt = '',
  width = 230,
  height = 352,
  borderRadius = 8,
}: FilmImageProps) => {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );

  React.useEffect(() => {
    const img = new Image();
    img.src = src;

    const handleLoad = () => setStatus('loaded');
    const handleError = () => setStatus('error');

    img.onload = handleLoad;
    img.onerror = handleError;

    // cleanup (if the component is unmounted before loading)
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  if (status === 'loading') {
    return (
      <Skeleton.Image
        active
        style={{
          width: isMobile ? width : '230px',
          height: isMobile ? height : '352px',
          borderRadius,
        }}
      />
    );
  }

  if (status === 'error') {
    return (
      <div
        style={{
          width: isMobile ? width : '230px',
          height: isMobile ? height : '352px',
          borderRadius,
          backgroundColor: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        Image failed
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        borderRadius,
        display: 'block',
        objectFit: 'cover',
      }}
    />
  );
};
