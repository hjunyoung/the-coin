import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import ModeToggleButton from '../components/ModeToggleButton';
import Navigation from '../components/Navigation';
import { fetchCoinInfo, fetchCoinPrice } from '../api';
import Loader from '../components/Loader';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { latestCoinIdAtom } from '../atoms';
import PageTitle from '../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Chart from '../components/Chart';

const Container = styled.section`
  ${(props) => props.theme.containerStyle};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 24px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  min-height: 56px;

  border-bottom: 2px solid ${(props) => props.theme.color.textColor};

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h1 {
    font-size: 2.2rem;
  }
`;

const Btn = styled.button`
  font-size: 1.5rem;
  align-self: end;
  color: ${(props) => props.theme.color.textColor};
  margin: 0 8px;
`;

const CoinIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Overview = styled.section`
  width: 100%;
`;

const OverviewItem = styled.section``;

type IParams = {
  coinId: string;
};
interface ILocation {
  state: {
    name: string;
    symbol: string;
  };
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: IPrice;
  };
}

const Detail = () => {
  const { coinId } = useParams() as IParams;
  const { state } = useLocation() as ILocation;
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ['price', coinId],
    () => fetchCoinPrice(coinId),
    { refetchInterval: 5000 }
  );
  const isLoading = infoLoading || priceLoading;

  const setLatestCoinId = useSetRecoilState(latestCoinIdAtom);
  setLatestCoinId(coinId);

  // console.log('Repeated Detail page Rendering');

  return (
    <>
      <Helmet>
        <title>
          {state?.name
            ? `${state.name} | theCoin`
            : isLoading
            ? 'theCoin'
            : `${infoData?.name} | theCoin`}
        </title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Header>
            <div>
              <CoinIcon
                src={`https://cryptoicon-api.vercel.app/api/icon/${
                  state?.symbol
                    ? state.symbol
                    : isLoading || infoData?.symbol.toLowerCase()
                }`}
                alt={`${coinId} icon`}
              />
              <PageTitle title={infoData?.name} />
            </div>
            <Btn aria-label="Add to watch list button">
              <FontAwesomeIcon icon={faStarRegular} />
            </Btn>
          </Header>
          <Overview>
            <OverviewItem>
              <p>{priceData?.quotes.USD.price.toFixed(2)}</p>
              <p>{priceData?.quotes.USD.percent_change_24h}</p>
            </OverviewItem>
            <Chart coinId={coinId} />
          </Overview>
          <ModeToggleButton />
        </Container>
      )}
      <Navigation />
    </>
  );
};

export default Detail;
