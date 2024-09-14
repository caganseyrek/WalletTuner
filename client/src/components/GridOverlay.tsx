import { FC } from "react";

interface GridOverlayProps {
  type: "loading" | "error";
  message?: string;
}

const GridOverlay: FC<GridOverlayProps> = ({ type, message }) => {
  return (
    <div>
      {type}
      {message}
    </div>
  );
};

export default GridOverlay;
