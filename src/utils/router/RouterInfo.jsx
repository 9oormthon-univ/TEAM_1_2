import Layout from '../../components/Layout';
import HomePage from '../../pages/home';
import CollagePage from '../../pages/collage';
import FeedPage from '../../pages/feed';
import MyPage from '../../pages/mypage';
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
