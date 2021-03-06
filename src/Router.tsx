import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';
import { Helmet } from 'react-helmet';
import WatchList from './routes/WatchList';
import MyPortfolio from './routes/MyPortfolio';
import About from './routes/About';

const Router = () => {
  return (
    <>
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:coinId" element={<Detail />}></Route>
          <Route path="/watchlist" element={<WatchList />}></Route>
          <Route path="/portfolio" element={<MyPortfolio />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
