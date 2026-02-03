declare module 'next/image' {
  import { ComponentProps } from 'react';
  
  interface ImageProps extends ComponentProps<'img'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    className?: string;
    onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
}
