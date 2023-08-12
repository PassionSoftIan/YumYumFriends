import React from 'react';
import { useSprings, animated } from 'react-spring';

const importAll = (context: __WebpackModuleApi.RequireContext): string[] => {
  return context.keys().map((key: string) => context(key));
};

const imageContext = require.context('../../assets/StopYums', false, /\.(png|jpe?g|svg)$/);
const images: string[] = importAll(imageContext);

const RainFall: React.FC = () => {
  const springs = useSprings(
    images.length,
    images.map((image, index) => ({
      to: async (next: any) => {
        while (true) {
          await next({ opacity: 1, y: window.innerHeight });
          await next({ opacity: 0, y: 0 });
        }
      },
      from: { opacity: 0, y: -100 },
      config: { tension: 100, friction: 10 },
      delay: index * 200,
    }))
  );

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {springs.map((props: any, index: number) => (
        <animated.img
          key={index}
          src={images[index]}
          alt={`Image ${index + 1}`}
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            ...props,
          }}
        />
      ))}
    </div>
  );
};

export default RainFall;
