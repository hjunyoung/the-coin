import { useQuery } from 'react-query';
import { fetchCoins } from '../api';

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
    <h1>
      {coins?.map((coin) => (
        <h2>{coin.symbol}</h2>
      ))}
    </h1>
  );
};

export default Home;
