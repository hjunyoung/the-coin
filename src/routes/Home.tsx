import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchCoins } from '../api';
import Loader from '../components/Loader';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';

const Container = styled.section`
  ${(props) => props.theme.containerStyle};
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: ${(props) => props.theme.mobileNavHeight};
`;

const CoinsList = styled.ul`
  width: 100%;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 700;

  background-color: ${(props) => props.theme.color.sectionColor};
  color: ${(props) => props.theme.color.textColor};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 12px;
  transition: color 0.2s ease-in-out;

  box-shadow: rgba(70, 70, 70, 0.16) 0px -1px 6px,
    rgba(70, 70, 70, 0.23) 0px 4px 6px, rgba(70, 70, 70, 0.16) 0px 0px 6px,
    rgba(70, 70, 70, 0.23) 2px 0px 6px;

  &:hover {
    color: ${(props) => props.theme.color.accentColor};
  }
`;

const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
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
          <Header />
          <CoinsList>
            {coins?.slice(0, 100).map((coin) => (
              <Link
                key={coin.id}
                to={`/${coin.id}`}
                state={{ name: coin.name }}
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
