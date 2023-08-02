import React, { useEffect, useState } from 'react';
import useDynamicImport from '../../hooks/Animations/useDynamicImport';

const AvocadoAnimation = () => {
  const [animationList, setAnimationList] = useState<string[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);

  const animationContext = require.context(
    '../../assets/Animations',
    false,
    /\.(gif)$/i
  );
  const importedAnimations = useDynamicImport(animationContext);

  useEffect(() => {
    setAnimationList(importedAnimations);
  }, [importedAnimations]);

  useEffect(() => {
    if (animationList.length > 0) {
      const randomIndex = Math.floor(Math.random() * animationList.length);
      setCurrentAnimation(animationList[randomIndex]);
    }
  }, [animationList]);

  return (
    <div>
      {currentAnimation && (
        <img src={currentAnimation} alt="Avocado Kick" />
      )}
    </div>
  );
};

export default AvocadoAnimation;
