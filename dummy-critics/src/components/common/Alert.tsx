import { useEffect } from "react";
import { Variants, motion } from "framer-motion";

type AlertType = {
  open: boolean;
  setOpen: Function;
  type: "warning" | "info" | "error" | "success";
  title: string;
};

export const Alert: React.FC<AlertType> = ({ title, type, open, setOpen }) => {
  useEffect(() => {
    if (open)
      setTimeout(() => {
        setOpen(false);
      }, 3000);
  }, [open]);

  const variantsAlert: Variants = {
    hide: {
      x: 400,
    },
    unhide: {
      x: 0,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      animate={open ? "unhide" : "hide"}
      variants={variantsAlert}
      className={`${
        open ? "block" : "hidden"
      } fixed top-[10vh] right-10 w-max-[370px] bg-[#424242] p-2 rounded border-[1px] ${
        type === "success"
          ? "border-green-300"
          : type === "error"
          ? "border-red-300"
          : type === "warning"
          ? "border-yellow-300"
          : "border-blue-300"
      }`}
    >
      {title}
    </motion.div>
  );
};
