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

const CoinTitle = styled.h1``;

const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
`;

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
        <CoinTitle>
          <CoinIcon
            src={`https://cryptoicon-api.vercel.app/api/icon/${
              state?.symbol
                ? state.symbol
                : isLoading || infoData?.symbol.toLowerCase()
            }`}
            alt="coin icon"
          />
          {state?.name ? state.name : isLoading ? '' : infoData?.name}
        </CoinTitle>
      )}
      <ModeToggleButton />
      <Navigation />
    </>
  );
};

export default Detail;
