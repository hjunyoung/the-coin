import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchCoins } from '../api';
import Loader from '../components/Loader';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { Helmet } from 'react-helmet';
import PageTitle from '../components/PageTitle';

const Container = styled.section`
  ${(props) => props.theme.containerStyle};
  ${(props) => props.theme.flexColumn('flex-start', 'center')};
  gap: 24px;

  margin-bottom: ${(props) => props.theme.mobileNavHeight};
`;

const CoinsList = styled.ul`
  /* min-width: 350px; */
  /* max-width: 440px; */
  width: 100%;
`;

const Coin = styled.li`
  ${(props) => props.theme.flex('flex-start', 'center')};
  gap: 8px;

  font-weight: 700;
  background-color: ${(props) => props.theme.color.sectionColor};
  color: ${(props) => props.theme.color.textColor};
  padding: 16px;
  margin-bottom: 12px;

  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.border.borderRadius};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.color.accentColor};
  }
`;

const CoinIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Home = () => {
  const { isLoading, data: coins } = useQuery<ICoin[]>('allCoins', fetchCoins);
  return (
    <>
      <Helmet>
        <title>theCoin</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <PageTitle />
          <CoinsList>
            {coins?.slice(0, 100).map((coin) => (
              <Link
                key={coin.id}
                to={`/${coin.id}`}
                state={{ name: coin.name, symbol: coin.symbol.toLowerCase() }}
              >
                <Coin>
                  <CoinIcon
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt="coin icon"
                  />
                  <span>{coin.name}</span>
                </Coin>
              </Link>
            ))}
          </CoinsList>
          <Navigation />
        </Container>
      )}
    </>
  );
};

export default Home;
