import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faStar,
  faChartLine,
  faChartPie,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;

  width: 100vw;
  border-top: 1px solid ${(props) => props.theme.color.accentColor};
  ${(props) => props.theme.flexCenter};
  justify-content: space-evenly;

  height: ${(props) => props.theme.mobileNavHeight};
  padding: 16px 0;
  background-color: ${(props) => props.theme.color.textColor};
`;

const Btn = styled.button<{ isCurrent: boolean }>`
  font-size: 1.2rem;
  color: ${(props) =>
    props.isCurrent
      ? props.theme.color.accentColor
      : props.theme.color.bgColor};
`;

const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <NavContainer>
      <Link to="/">
        <Btn isCurrent={pathname === '/'} aria-label="Home button">
          <FontAwesomeIcon icon={faHome} />
        </Btn>
      </Link>
      <Link to="/:coinId">
        {/* latest coin detail */}
        <Btn
          isCurrent={pathname === '/:coinId'}
          aria-label="Coin Detail button"
        >
          <FontAwesomeIcon icon={faChartLine} />
        </Btn>
      </Link>
      <Link to="/watchlist">
        <Btn
          isCurrent={pathname === '/watchlist'}
          aria-label="Watch list button"
        >
          <FontAwesomeIcon icon={faStar} />
        </Btn>
      </Link>
      <Link to="/portfolio">
        <Btn
          isCurrent={pathname === '/portfolio'}
          aria-label="My Portfolio button"
        >
          <FontAwesomeIcon icon={faChartPie} />
        </Btn>
      </Link>
      <Link to="/about">
        <Btn isCurrent={pathname === '/about'} aria-label="About button">
          <FontAwesomeIcon icon={faBars} />
        </Btn>
      </Link>
    </NavContainer>
  );
};

export default Navigation;
