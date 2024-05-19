import { memo } from "react";

interface ICardProps {
  children?: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow">{children}</div>
  );
};

export default memo(Card);
