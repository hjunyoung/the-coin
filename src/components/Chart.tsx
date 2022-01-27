import { memo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchCoinHistory } from '../api';
import { isDarkAtom } from '../atoms';
import Loader from './Loader';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const DurationContainer = styled.section`
  display: flex;
  gap: 8px;
  font-weight: 700;

  align-self: end;
`;

const DurationBtn = styled.button<{ isSelected: boolean }>`
  ${(props) => props.theme.buttonStyle};
  background-color: ${(props) => props.theme.color.sectionColor};
  color: ${(props) =>
    props.isSelected
      ? props.theme.color.accentColor
      : props.theme.color.textColor};
  font-size: 12px;

  box-shadow: ${(props) => props.theme.boxShadow};
`;

type IChartProps = {
  coinId: string;
};

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

type PeriodMapType = {
  [key: string]: number;
  '1W': number;
  '2W': number;
  '1M': number;
  '3M': number;
  '6M': number;
};

const periodMap: PeriodMapType = {
  '1W': 7,
  '2W': 14,
  '1M': 30,
  '3M': 90,
  '6M': 180,
};

const Chart = ({ coinId }: IChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);
  const [duration, setDuration] = useState('1M');
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  // console.log(`Stop repeated chart page rendering using memo`);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DurationContainer>
            <DurationBtn
              isSelected={duration === '1W'}
              onClick={() => setDuration('1W')}
            >
              1W
            </DurationBtn>
            <DurationBtn
              isSelected={duration === '2W'}
              onClick={() => setDuration('2W')}
            >
              2W
            </DurationBtn>
            <DurationBtn
              isSelected={duration === '1M'}
              onClick={() => setDuration('1M')}
            >
              1M
            </DurationBtn>
            <DurationBtn
              isSelected={duration === '3M'}
              onClick={() => setDuration('3M')}
            >
              3M
            </DurationBtn>
            <DurationBtn
              isSelected={duration === '6M'}
              onClick={() => setDuration('6M')}
            >
              6M
            </DurationBtn>
          </DurationContainer>
          <ApexCharts
            type="candlestick"
            series={[
              {
                data: data?.slice(-periodMap[duration]).map((price) => {
                  return {
                    x: price.time_open,
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                toolbar: { show: false },
                background: 'transparent',
                zoom: {
                  enabled: false,
                },
              },
              grid: {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(150, 150, 150, 0.85)',
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: '#2DCD71',
                    downward: '#E54C3D',
                  },
                },
              },
              xaxis: {
                type: 'datetime',

                axisBorder: {
                  color: isDark ? 'whitesmoke' : 'rgb(150, 150, 150)',
                },
                axisTicks: {
                  color: isDark ? 'whitesmoke' : 'rgb(150, 150, 150)',
                },
              },
              tooltip: {
                x: {
                  format: 'dd MMM yyyy',
                },
              },
            }}
          />
        </>
      )}
    </Container>
  );
};

export default memo(Chart);
