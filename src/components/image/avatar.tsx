import React, { useState } from 'react';
import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import Placeholder from 'src/assets/img/placeholder-avatar.png';

interface AvatarProps extends AntdAvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, ...props }) => {
  const host = process.env.REACT_APP_API_URL;
  const [source, setSource] = useState<string>(host + src);
  const handleError = () => {
    setSource(Placeholder);
    return true;
  };
  return <AntdAvatar src={source} onError={handleError} {...props} />;
};

Avatar.displayName = 'Image';
export default Avatar;
