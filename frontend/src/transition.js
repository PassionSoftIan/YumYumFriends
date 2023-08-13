import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      {/* <motion.div
        className="slide-in"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      /> */}
      <motion.div
        className="slide-out"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        exit={{ x: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;