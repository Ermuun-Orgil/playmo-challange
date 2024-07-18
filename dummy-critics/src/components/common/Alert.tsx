import { useEffect } from "react";

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

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed top-10 right-10 bg-[#424242] p-2 rounded border-[1px] ${
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
    </div>
  );
};
