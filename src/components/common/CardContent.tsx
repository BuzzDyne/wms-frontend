import React, { ReactNode } from "react";
import { theme } from "antd";

interface CardContentProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
  className,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        marginTop: 8,
        padding: 16,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        ...style, // Merge any additional styles
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default CardContent;
