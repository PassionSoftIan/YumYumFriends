import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

const useColorConfetti = (confettiRadius: number, confettiNumber: number) => {
  const jsConfettiInstance = new JSConfetti();

  useEffect(() => {
    const handleConfetti = () => {
      jsConfettiInstance.addConfetti({
        confettiColors: [
            // "#fff5e4",
            // "#ffe3e1",
            // "#ffd1d1",
            // "#ff9494",
            // "#C9CE6C",
            // "#6F9A44",
            "#d0e9d2",
            "#e9d2d0",
            "#d2d0e9",
            "#a2dae1",
            "#dae1a2",
            "#e1a2da",
          ],
        confettiRadius: confettiRadius,
        confettiNumber: confettiNumber,
      });
    };

    window.addEventListener('confetti', handleConfetti);

    return () => {
      window.removeEventListener('confetti', handleConfetti);
    };
  }, [confettiRadius, confettiNumber]);

  const triggerConfetti = () => {
    const event = new Event('confetti');
    window.dispatchEvent(event);
  };

  return { triggerConfetti };
};


export default useColorConfetti;