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
import { useRecoilValue } from 'recoil';
import { latestCoinIdAtom } from '../atoms';

const NavContainer = styled.nav`
  ${(props) => props.theme.flex('space-evenly', 'center')};
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: ${(props) => props.theme.mobileNavHeight};
  background-color: ${(props) => props.theme.color.textColor};

  padding: 16px 0;
  border-top: 1px solid ${(props) => props.theme.color.accentColor};
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
  const latestCoinId = useRecoilValue(latestCoinIdAtom);
  return (
    <NavContainer>
      <Link to="/">
        <Btn isCurrent={pathname === '/'} aria-label="Home button">
          <FontAwesomeIcon icon={faHome} />
        </Btn>
      </Link>
      <Link to={`/${latestCoinId}`}>
        <Btn
          isCurrent={pathname === `/${latestCoinId}`}
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
