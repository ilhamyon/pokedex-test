import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const LayoutStyles = css`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 576px;
`;

const Layout: (props: LayoutProps) => EmotionJSX.Element = ({
  children,
}) => {
  return <div css={LayoutStyles}>{children}</div>;
};

export default Layout;
