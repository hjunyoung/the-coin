import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { darkTheme, lightTheme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const queryClient = new QueryClient();

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
