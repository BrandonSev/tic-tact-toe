import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useMemo } from "react";

function Line({ dir }: { dir: string }) {
  const origin = useMemo(() => {
    switch (dir) {
      case "center-x":
        return "top-1/2 translate-y-1/2 left-6 right-6 origin-center h-1";
      case "center-y":
        return "left-1/2 right-1/2 -translate-x-1/2 top-6 bottom-6 w-1";
      case "left-y":
        return "sm:left-[48px] left-[38px] top-6 bottom-6 w-1";
      case "right-y":
        return "sm:right-[48px] right-[38px] top-6 bottom-6 w-1";
      case "top-x":
        return "sm:top-[52px] top-[42px] left-6 right-6 origin-center h-1";
      case "bottom-x":
        return "sm:bottom-[44px] bottom-[34px] left-6 right-6 origin-center h-1";
      case "diag-left":
        return "top-1/2 -left-6 -right-6 origin-center h-1 rotate-45";
      case "diag-right":
        return "top-1/2 -left-6 -right-6 origin-center h-1 -rotate-45";
      default:
        return "top-1/2 translate-y-1/2 left-6 right-6 origin-center h-1";
    }
  }, []);
  return (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`absolute bg-secondary ${origin}`}
      ></motion.span>
    </AnimatePresence>
  );
}

export default Line;
