import { Howl } from "howler";

function useSoundEffect(src: string, volume: number = 1): Howl {
  let sound: Howl | undefined;

  const soundEffect = (src: string) => {
    sound = new Howl({ src });
    sound!.volume(volume);
  };

  soundEffect(src);

  if (!sound) {
    throw new Error("Sound not properly initialized.");
  }

  return sound;
}

export default useSoundEffect;
