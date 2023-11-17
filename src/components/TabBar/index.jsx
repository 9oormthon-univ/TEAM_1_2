import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import icon_home from '../../../public/icon_home.png';
import icon_collage from '../../../public/icon_collage.png';
import icon_feed from '../../../public/icon_feed.png';
import icon_mypage from '../../../public/icon_mypage.png';

const Container = styled.div`
  position: relative;

  width: 24.375rem;
  height: 3.8125rem;

  display: flex;
  justify-content: center;
  gap: 3.56rem;

  background-color: white;

  .inactive {
    opacity: 0.3;
  }
  .active {
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  width: 2rem;
  height: 100%;

  display: flex;
  align-items: center;
`;

const TabBar = () => {
  return (
    <Container>
      <NavLink
        to={`home`}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        <IconContainer>
          <img src={icon_home} alt="home link" />
        </IconContainer>
      </NavLink>
      <NavLink
        to={`collage`}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        <IconContainer>
          <img src={icon_collage} alt="collage link" />
        </IconContainer>
      </NavLink>
      <NavLink
        to={`feed`}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        <IconContainer>
          <img src={icon_feed} alt="feed link" />
        </IconContainer>
      </NavLink>
      <NavLink
        to={`mypage`}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        <IconContainer>
          <img src={icon_mypage} alt="mypage link" />
        </IconContainer>
      </NavLink>
    </Container>
  );
};

export default TabBar;
