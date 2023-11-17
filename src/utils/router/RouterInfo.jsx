/* 기본 4개 탭에 대한 페이지 */
import Layout from '../../components/Layout';
import HomePage from '../../pages/home/HomePage';
import CollagePage from '../../pages/collage/CollagePage';
import FeedPage from '../../pages/feed/FeedPage';
import FriendsListPage from '../../pages/feed/FriendsListPage';
import MyPage from '../../pages/mypage/MyPage';
import EditProfilePage from '../../pages/mypage/EditProfilePage';
/* 소셜 로그인에 대한 페이지 */
import LoginPage from '../../pages/login/LoginPage';
import AuthPage from '../../pages/auth/AuthPage';
/* 기타 페이지 */
import SearchPage from '../../pages/search/SearchPage';
import WritePage from '../../pages/write/WritePage';
import NotificationPage from '../../pages/notification/NotificationPage';
import ErrorPage from '../../pages/error/ErrorPage';

export const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    /* 404 에러 페이지 라우팅 */
    errorElement: <ErrorPage />,
    children: [
      /* 기본 4개 탭에 대한 페이지 라우팅 */
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
        path: 'feed/friends-list',
        element: <FriendsListPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'mypage/edit',
        element: <EditProfilePage />,
      },
      /* 소셜 로그인에 대한 페이지 라우팅 */
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      /* 기타 페이지 라우팅 */
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'write',
        element: <WritePage />,
      },
      {
        path: 'notification',
        element: <NotificationPage />,
      },
    ],
  },
];
