import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ModeToggleButton from './ModeToggleButton';

const WebsiteTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.textColor};

  strong {
    color: ${(props) => props.theme.color.accentColor};
  }
`;

interface IPageTitleProps {
  title?: string;
}

const PageTitle = ({ title }: IPageTitleProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <WebsiteTitle>
        {pathname === '/' ? (
          <>
            the<strong>Coin</strong>
          </>
        ) : (
          title
        )}
      </WebsiteTitle>
      <ModeToggleButton />
    </>
  );
};

export default PageTitle;
