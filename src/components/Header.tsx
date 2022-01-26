import styled from 'styled-components';
import ModeToggleButton from './ModeToggleButton';

const WebsiteTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.textColor};
  margin-bottom: 24px;

  strong {
    color: ${(props) => props.theme.color.accentColor};
  }
`;

const Header = () => {
  return (
    <>
      <WebsiteTitle>
        the<strong>Coin</strong>
      </WebsiteTitle>
      <ModeToggleButton />
    </>
  );
};

export default Header;
