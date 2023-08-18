import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

const useConfetti = (emojis:string[], emojiSize:number, confettiNumber:number) => {
  const jsConfettiInstance = new JSConfetti();

  useEffect(() => {
    const handleConfetti = () => {
      jsConfettiInstance.addConfetti({
        emojis: emojis,
        emojiSize: emojiSize,
        confettiNumber: confettiNumber,
      });
    };

    window.addEventListener('confetti', handleConfetti);

    return () => {
      window.removeEventListener('confetti', handleConfetti);
    };
  }, [emojis, emojiSize, confettiNumber]);

  const triggerConfetti = () => {
    const event = new Event('confetti');
    window.dispatchEvent(event);
  };

  return { triggerConfetti };
};

export default useConfetti;