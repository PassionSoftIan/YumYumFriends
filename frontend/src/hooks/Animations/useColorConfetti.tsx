import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

const useColorConfetti = (confettiRadius: number, confettiNumber: number) => {
  const jsConfettiInstance = new JSConfetti();

  useEffect(() => {
    const handleConfetti = () => {
      jsConfettiInstance.addConfetti({
        confettiColors: [
            "#fff5e4",
            "#ffe3e1",
            "#ffd1d1",
            "#ff9494",
            "#C9CE6C",
            "#6F9A44",
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