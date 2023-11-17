import Layout from '../../components/Layout';
import HomePage from '../../pages/home/HomePage';
import CollagePage from '../../pages/collage';
import FeedPage from '../../pages/feed/FeedPage';
import MyPage from '../../pages/mypage/MyPage';
import ErrorPage from '../../pages/error';

export const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'collage',
        element: <CollagePage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
];
