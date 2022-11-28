import React from 'react';
import { Image as AntdImage, ImageProps as AntdImageProps } from 'antd';
import Placeholder from 'src/assets/img/placeholder.png';

interface ImageProps extends AntdImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  const host = process.env.REACT_APP_API_URL;
  return <AntdImage src={host + src} fallback={Placeholder} {...props} />;
};

Image.displayName = 'Image';
export default Image;
