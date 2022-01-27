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
  ${(props) => props.theme.flexColumn()};
  gap: 24px;
  padding-top: 56px;
  width: 100%;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;

  ${(props) => props.theme.flex('space-between', 'center')};
  background-color: ${(props) => props.theme.color.bgColor};
  min-height: 72px;
  width: calc(100% - 48px);

  border-bottom: 3px solid ${(props) => props.theme.border.primaryBorder};

  & > div {
    ${(props) => props.theme.flex('flex-start', 'center')};
    gap: 8px;
  }

  h1 {
    font-size: 2.2rem;
    align-self: flex-end;
  }
`;

const WatchListBtn = styled.button`
  font-size: 1.5rem;
  align-self: flex-end;
  color: ${(props) => props.theme.color.textColor};
  margin: 0 8px;
`;

const CoinIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Overview = styled.section`
  ${(props) => props.theme.flexColumn('flex-start', 'center')};
  gap: 16px;
  margin-top: 16px;
  padding-bottom: 48px;
  width: 100%;
`;

const PriceOverview = styled.section`
  ${(props) => props.theme.flex('flex-start', 'flex-end')};
  align-self: flex-start;
  width: 90%;
  gap: 8px;
  font-weight: 700;
  padding-bottom: 16px;
  border-bottom: 2px solid ${(props) => props.theme.border.secondaryBorder};
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
`;

const Changes = styled.span<{ percentChange: number }>`
  font-size: 1.5rem;
  color: ${(props) => {
    if (props.percentChange > 0) {
      return props.theme.color.chartUpColor;
    }
    if (props.percentChange < 0) {
      return props.theme.color.chartDownColor;
    }
    return props.theme.color.textColor;
  }};
`;

const PriceChange = styled(Changes)``;

const PercentChange = styled(Changes)``;

const ChartSection = styled.section`
  ${(props) => props.theme.flex('center', 'center')}
  width: 100%;
`;

const Summary = styled.section`
  ${(props) => props.theme.flexColumn()};
  padding-top: 16px;
  border-top: 2px solid ${(props) => props.theme.border.secondaryBorder};
  width: 90%;

  & > span {
    align-self: start;
    display: block;
    padding-left: 16px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

const SummaryItem = styled.section`
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.color.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.border.tertiaryBorder};
  ${(props) => props.theme.flex('space-between', 'center')};

  span:last-child {
    font-weight: 700;
  }

  &:last-child {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  li {
    font-weight: 700;
    margin-bottom: 4px;
  }
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

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
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
  tags: ITag[];
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

  const percentChange = priceData
    ? priceData?.quotes.USD.percent_change_24h
    : 0;
  const priceChange = priceData
    ? (percentChange * priceData?.quotes.USD.price) / (100 + percentChange)
    : 0;
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
            <WatchListBtn aria-label="Add to watch list button">
              <FontAwesomeIcon icon={faStarRegular} />
            </WatchListBtn>
          </Header>
          <Overview>
            <PriceOverview>
              <CurrentPrice>{`$${priceData?.quotes.USD.price.toFixed(
                2
              )}`}</CurrentPrice>
              <PriceChange percentChange={percentChange}>
                {priceChange.toFixed(2)}
              </PriceChange>
              <PercentChange percentChange={percentChange}>
                ({percentChange}%)
              </PercentChange>
            </PriceOverview>
            <ChartSection>
              <Chart coinId={coinId} />
            </ChartSection>
            <Summary>
              <span>Summary</span>
              <SummaryItem>
                <span>Market Cap</span>
                <span>{priceData?.quotes.USD.market_cap}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Circulating Supply</span>
                <span>{priceData?.circulating_supply}</span>
              </SummaryItem>
              <SummaryItem>
                <span>All-time High Price</span>
                <span>{priceData?.quotes.USD.ath_price.toFixed(2)}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Volume (24hr)</span>
                <span>{priceData?.quotes.USD.volume_24h}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Start Date</span>
                <span>{infoData?.started_at?.slice(0, 10)}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Tags</span>
                <ul>
                  {infoData?.tags.map((tag) => (
                    <li key={tag.name}>{tag.name}</li>
                  ))}
                </ul>
              </SummaryItem>
            </Summary>
          </Overview>
          <ModeToggleButton />
        </Container>
      )}
      <Navigation />
    </>
  );
};

export default Detail;
