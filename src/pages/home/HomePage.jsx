import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useNavigate,
  useLocation,
  Link,
  useLoaderData,
} from 'react-router-dom';
import axios from 'axios';

import YearlyContent from '@components/home/YearlyContent';
import SeasonalContent from '@components/home/SeasonalContent';
import TabBar from '@components/common/TabBar';

import logo from '@assets/components/topbar/logo.png';
import arrow_svg from '@assets/arrowSvg.png';

const Top = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  width: 24.375rem;
  height: 2.5rem;

  background-color: #ffffff;
`;

const LogoBox = styled.div`
  height: 100%;
  margin: 0 1rem;

  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const NavBox = styled.div`
  margin: 0 1rem;

  height: 100%;

  display: flex;
  align-items: center;
  gap: 0.88rem;
`;

const Season = styled.div`
  position: relative;
  width: 24.375rem;
  height: 3.5625rem;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 1.25rem;
  column-gap: 0.5rem;

  font-family: Noto Serif KR;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #333;

  .season__title {
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .season__description {
    margin-bottom: 0.5rem;

    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const FortuneContainer = styled.div`
  width: 100%;
  height: 2.75rem;

  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Fortune = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 21.875rem;
  height: 2rem;
  padding: 0 1rem;

  border-radius: 1.125rem 1rem 1rem 1.125rem;
  border: 1px solid rgba(202, 202, 202, 50);
  background: #fff;

  color: #333;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .fortune__title {
    display: flex;
    column-gap: 0.32rem;
  }

  .fortune__date {
    color: #bfbfbf;
  }
`;

const PopupLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Category = styled.div`
  position: relative;
  width: 24.375rem;
  height: 4.4375rem;
  padding: 1.87rem 1.25rem 0.38rem;

  display: flex;
  justify-content: space-between;
  align-content: flex-end;

  background-color: #fff;
`;

const Year = styled.h1`
  position: relative;
  display: flex;

  font-family: Noto Serif KR;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.1775rem;

  color: #333;
`;

const Select = styled.div`
  position: relative;
  /* width: 4rem; */
  /* height: 100%; */

  display: flex;
  align-items: center;

  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;

  select {
    height: 1.25rem;

    border: none;
    outline: none;

    font-family: AppleSDGothicNeoR00;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* IE */
  select::-ms-expand {
    display: none;
  }

  img {
    width: 0.52419rem;
    height: 0.3125rem;

    margin-left: 0.25rem;
  }
`;

const ContentArea = styled.div`
  position: relative;
  overflow-y: auto;

  width: 100%;
  height: calc(100% - 2.5rem - 3.5625rem - 2.75rem - 4.4375rem);
  padding-bottom: 3.8125rem;

  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  color: black;
`;

// 여기서부터 운세 팝업창
const ModalOverlay = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 17.6875rem;
  margin-left: -8.5rem;
  height: 12.5rem;
  margin-top: -6.25rem;
  z-index: 2;

  display: flex;
  flex-direction: column;
  /* margin-top: 6rem; */

  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
`;

const ModalTop = styled.div`
  position: relative;
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  color: #8e8c86;
  font-family: AppleSDGothicNeoSB00;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;

const ModalTitle = styled.div`
  position: relative;
  display: flex;
  margin-left: 1.5rem;

  color: #333;
  font-family: AppleSDGothicNeoEB00;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Hr = styled.div`
  position: relative;
  display: flex;
  margin: 0.5rem auto;
  width: 14.9375rem;
  height: 0.03125rem;
  background: #8e8c86;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  text-align: justify;
  margin: 1rem auto;

  width: 14.9375rem;
  color: #333;
  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 팝업 구현
const Popup = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  const Close = () => {
    onClose();
    setShowPopup(false);
  };

  return (
    <ModalOverlay>
      <ModalTop>
        <div>11월 18일</div>
        <svg
          onClick={Close}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.40002 18.6538L5.34619 17.6L10.9462 12L5.34619 6.40002L6.40002 5.34619L12 10.9462L17.6 5.34619L18.6538 6.40002L13.0538 12L18.6538 17.6L17.6 18.6538L12 13.0538L6.40002 18.6538Z"
            fill="black"
          />
        </svg>
      </ModalTop>
      <ModalTitle>오늘의 운세</ModalTitle>
      <Hr />
      <ModalContent>
        당신의 열정과 노력이 빛을 발하며, 새로운 도약이 가능한 날입니다. 자신을
        믿고 목표를 향해 나아가세요.
      </ModalContent>
    </ModalOverlay>
  );
};

const HomePage = () => {
  //const { response } = useLoaderData();
  //console.log(response);

  //팝업
  const [showPopup, setShowPopup] = useState(false);
  const Open = () => {
    setShowPopup(true);
  };
  const Close = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPopup]);

  //홈
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('year');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    navigate(`/home?category=${newCategory}`);
  };

  return (
    <>
      <Top>
        <LogoBox>
          <img src={logo} width={30} height={30} />
          <svg
            style={{
              alignItems: 'center',
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="92"
            height="17"
            viewBox="0 0 92 17"
            fill="none"
          >
            <svg clipPath="url(#clip0_669_2902)">
              <path
                d="M4.46912 13.2625C2.8198 13.2625 1.64932 12.5192 1.12792 12.275C0.883183 12.4767 0.649086 12.7634 0.510756 13.1563H0V8.73907H0.595882C0.776775 9.90709 1.80893 12.1369 4.32015 12.1369C5.70345 12.1369 6.54407 11.3724 6.54407 10.2469C6.54407 9.32308 5.46935 8.77093 4.2563 8.11259L2.25584 7.0189C1.03215 6.3287 0.159611 5.20316 0.159611 3.55731C0.159611 1.78404 1.64932 0.223145 3.83067 0.223145C5.00116 0.223145 5.83114 0.616024 6.4483 1.062C6.69304 0.860246 6.92713 0.584169 7.06546 0.223145H7.5443V4.17318H6.9697C6.61855 2.59104 5.71409 1.33807 3.93708 1.33807C2.94749 1.33807 2.20264 1.9327 2.20264 2.8565C2.20264 3.86524 3.08582 4.3006 4.36271 4.96955L6.07587 5.87211C7.86352 6.81715 8.54453 8.02764 8.54453 9.32308C8.54453 11.5848 6.83137 13.2519 4.46912 13.2519V13.2625Z"
                fill="black"
              />
              <path
                d="M14.6738 13.1563C11.971 13.1563 10.1621 11.0963 10.1621 8.40987C10.1621 5.72343 12.3647 3.73779 14.6738 3.73779C17.1424 3.73779 18.547 5.42611 18.547 7.12505C18.547 7.51793 18.4832 7.78339 18.4193 8.02761H12.7372V8.53729C12.7797 10.5335 13.3331 11.967 15.4931 11.967C16.6104 11.967 17.5787 11.4573 18.2704 10.8202L18.8024 11.5635C17.9618 12.3811 16.5572 13.1457 14.6632 13.1457L14.6738 13.1563ZM14.7589 4.76777C13.8545 4.76777 13.1096 5.46859 12.8436 7.07196H16.238C16.2593 6.94454 16.2805 6.72155 16.2805 6.5198C16.2805 5.37302 15.6634 4.76777 14.7589 4.76777Z"
                fill="black"
              />
              <path
                d="M27.4637 13.0816C26.2294 13.0816 25.7506 12.3595 25.6123 11.6375C24.5375 12.6038 23.6331 13.0922 22.5796 13.0922C21.1219 13.0922 20.228 12.1896 20.228 10.9367C20.228 8.91919 22.5584 7.88921 25.5484 7.40076V6.76366C25.5484 5.28771 25.2611 4.62937 24.1651 4.62937C23.4203 4.62937 22.6967 5.02225 22.6967 5.83986C22.6967 6.39202 22.2817 6.80614 21.7709 6.80614C21.2176 6.80614 20.8239 6.39202 20.8239 5.83986C20.8239 4.56566 22.6328 3.74805 24.3886 3.74805C26.9423 3.74805 27.9745 4.87359 27.9745 6.95479V11.234C27.9745 11.8499 28.1448 12.1153 28.4533 12.1153C28.6981 12.1153 28.9109 11.9667 29.0705 11.8286L29.3791 12.3383C28.8683 12.8267 28.2086 13.0816 27.4637 13.0816ZM25.5484 8.18652C23.4309 8.66435 22.5158 9.68371 22.5158 10.6712C22.5158 11.3508 22.9308 11.7755 23.5905 11.7755C24.0268 11.7755 24.7397 11.5738 25.5484 10.788V8.1759V8.18652Z"
                fill="black"
              />
              <path
                d="M34.0826 13.156C32.8483 13.156 31.8374 12.6464 31.3053 12.1898C31.1032 12.4765 31.018 12.7632 30.9542 13.0499H30.4009V9.67321H30.9755C31.1989 10.8412 32.4971 12.1154 34.1039 12.1154C35.0296 12.1154 35.4233 11.6058 35.4233 11.0005C35.4233 10.4484 34.87 10.0555 33.923 9.64136L32.8908 9.18477C31.1777 8.50519 30.5179 7.58139 30.5179 6.30719C30.5179 4.88433 31.7523 3.71631 33.4229 3.71631C34.6785 3.71631 35.4446 4.1729 35.8383 4.48083C35.966 4.32156 36.1043 4.06671 36.1256 3.82249H36.6364V6.49832H36.083C35.8383 5.40463 34.8274 4.71443 33.6676 4.71443C32.7418 4.71443 32.412 5.22412 32.412 5.70194C32.412 6.21162 32.8695 6.56203 33.9975 7.01862L34.8594 7.39026C36.5725 8.0486 37.2855 9.12106 37.2855 10.1829C37.2855 11.9668 36.0724 13.1454 34.0719 13.1454L34.0826 13.156Z"
                fill="black"
              />
              <path
                d="M43.5421 13.2413C40.6797 13.2413 38.5303 11.107 38.5303 8.45246C38.5303 5.79787 40.6691 3.66357 43.5421 3.66357C46.4151 3.66357 48.5752 5.79787 48.5752 8.45246C48.5752 11.107 46.3938 13.2413 43.5421 13.2413ZM43.5421 4.67232C41.914 4.67232 41.1479 6.07394 41.1479 8.45246C41.1479 10.831 41.914 12.2326 43.5421 12.2326C45.1701 12.2326 45.9575 10.8522 45.9575 8.45246C45.9575 6.05271 45.1488 4.67232 43.5421 4.67232Z"
                fill="black"
              />
              <path
                d="M56.3533 12.9118V12.3384C57.5025 12.3384 57.8004 11.988 57.8004 9.92805V7.49645C57.8004 5.8506 57.2471 5.05422 56.0128 5.05422C54.7785 5.05422 53.6612 6.20101 53.6612 7.75129V9.92805C53.6612 11.988 53.9485 12.3384 55.1083 12.3384V12.9118H49.6709V12.3384C50.9265 12.3384 51.2351 11.988 51.2351 9.92805V7.1779C51.2351 5.11793 50.9904 4.76753 49.6922 4.76753V4.19414L53.2568 3.71631C53.3845 3.98177 53.6718 4.94804 53.6718 5.52143C54.2464 4.64011 55.4275 3.73755 56.9705 3.73755C59.088 3.73755 60.2478 5.18164 60.2478 7.27346V9.92805C60.2478 11.988 60.5351 12.3384 61.812 12.3384V12.9118H56.3746H56.3533Z"
                fill="black"
              />
              <path
                d="M62.4507 12.9119V12.3385C63.7063 12.3385 64.0149 11.9881 64.0149 9.92817V7.17801C64.0149 5.11805 63.7489 4.76764 62.4507 4.76764V4.19425L66.4516 3.71643V9.92817C66.4516 11.9881 66.7389 12.3385 68.0158 12.3385V12.9119H62.4507ZM65.1747 0C65.9196 0 66.5155 0.573392 66.5155 1.31668C66.5155 2.05996 65.9196 2.63335 65.1747 2.63335C64.4299 2.63335 63.8553 2.05996 63.8553 1.31668C63.8553 0.573392 64.4299 0 65.1747 0Z"
                fill="black"
              />
              <path
                d="M75.5598 12.9118V12.3384C76.709 12.3384 77.007 11.988 77.007 9.92805V7.49645C77.007 5.8506 76.4537 5.05422 75.2193 5.05422C73.985 5.05422 72.8677 6.20101 72.8677 7.75129V9.92805C72.8677 11.988 73.155 12.3384 74.3149 12.3384V12.9118H68.8774V12.3384C70.1331 12.3384 70.4416 11.988 70.4416 9.92805V7.1779C70.4416 5.11793 70.1969 4.76753 68.8987 4.76753V4.19414L72.4634 3.71631C72.5911 3.98177 72.8784 4.94804 72.8784 5.52143C73.453 4.64011 74.6341 3.73755 76.177 3.73755C78.2945 3.73755 79.4544 5.18164 79.4544 7.27346V9.92805C79.4544 11.988 79.7417 12.3384 81.0185 12.3384V12.9118H75.5811H75.5598Z"
                fill="black"
              />
              <path
                d="M91.1591 5.90357C90.7654 5.90357 90.5633 5.70183 90.4143 5.37266C90.3079 5.08596 90.2121 4.84174 89.861 4.84174C89.6801 4.84174 89.4247 4.97978 89.2225 5.19214C89.6375 5.64873 89.7971 6.24336 89.7971 6.77428C89.7971 8.37765 88.4138 9.58815 86.3176 9.77928C83.8064 10.0235 83.4978 10.1722 83.4978 10.5438C83.4978 10.8305 83.7851 11.0216 85.6579 11.0322C89.2013 11.096 90.4356 12.2215 90.4356 13.8886C90.4356 15.6406 88.6054 17.0104 85.7324 17.0104C82.8594 17.0104 81.4229 16.0229 81.4229 14.8761C81.4229 14.154 82.1039 13.5807 82.8487 13.4532L83.402 13.7187C82.9658 13.8992 82.721 14.2284 82.721 14.6637C82.721 15.4282 84.0192 16.0229 85.7324 16.0229C87.7541 16.0229 88.8075 15.2796 88.8075 14.5044C88.8075 13.7293 88.1478 13.3152 85.4663 13.2515C82.7849 13.209 81.8804 12.3489 81.8804 11.3189C81.8804 10.3951 82.721 9.7368 83.9447 9.47135C82.7955 9.01476 81.8804 8.06972 81.8804 6.77428C81.8804 4.9904 83.6149 3.74805 85.8601 3.74805C86.8922 3.74805 87.9988 4.05598 88.6798 4.62937C89.2119 4.09845 89.9567 3.76928 90.5101 3.76928C91.4571 3.76928 91.9891 4.32144 91.9891 4.97978C91.9891 5.46822 91.6806 5.90357 91.1485 5.90357H91.1591ZM85.8601 4.65061C84.9343 4.65061 84.3597 5.41513 84.3597 6.76366C84.3597 8.11219 84.9343 8.88733 85.8601 8.88733C86.7858 8.88733 87.3391 8.06972 87.3391 6.76366C87.3391 5.4576 86.7858 4.65061 85.8601 4.65061Z"
                fill="black"
              />
            </svg>
            <defs>
              <clipPth id="clipP669_2902">
                <rect width="92" height="17" fill="white" />
              </clipPth>
            </defs>
          </svg>
        </LogoBox>

        <NavBox>
          <Link to={`/search`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5422 20.577L13.2615 14.2962C12.7615 14.7091 12.1865 15.0321 11.5365 15.2655C10.8865 15.4988 10.214 15.6155 9.51916 15.6155C7.80999 15.6155 6.36348 15.0237 5.17961 13.8401C3.99574 12.6566 3.40381 11.2104 3.40381 9.50169C3.40381 7.79296 3.99559 6.34628 5.17916 5.16167C6.36273 3.97707 7.80888 3.38477 9.51761 3.38477C11.2263 3.38477 12.673 3.9767 13.8576 5.16057C15.0422 6.34443 15.6345 7.79095 15.6345 9.50012C15.6345 10.2142 15.5147 10.8963 15.2749 11.5463C15.0352 12.1963 14.7153 12.7617 14.3153 13.2424L20.5961 19.5232L19.5422 20.577ZM9.51916 14.1155C10.8076 14.1155 11.899 13.6684 12.7932 12.7742C13.6874 11.8799 14.1346 10.7886 14.1346 9.50012C14.1346 8.21165 13.6874 7.1203 12.7932 6.22607C11.899 5.33183 10.8076 4.88472 9.51916 4.88472C8.23069 4.88472 7.13934 5.33183 6.24511 6.22607C5.35089 7.1203 4.90378 8.21165 4.90378 9.50012C4.90378 10.7886 5.35089 11.8799 6.24511 12.7742C7.13934 13.6684 8.23069 14.1155 9.51916 14.1155Z"
                fill="black"
              />
            </svg>
          </Link>
          <Link to={`/notification`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.5 18.8846V17.3846H6.3077V9.92305C6.3077 8.57818 6.72276 7.38908 7.55287 6.35575C8.38301 5.32242 9.44872 4.66153 10.75 4.37308V3.75C10.75 3.40278 10.8714 3.10765 11.1143 2.8646C11.3571 2.62153 11.6519 2.5 11.9988 2.5C12.3457 2.5 12.641 2.62153 12.8846 2.8646C13.1282 3.10765 13.25 3.40278 13.25 3.75V4.37308C14.5512 4.66153 15.6169 5.32242 16.4471 6.35575C17.2772 7.38908 17.6922 8.57818 17.6922 9.92305V17.3846H19.5V18.8846H4.5ZM11.9983 21.6923C11.5007 21.6923 11.0753 21.5153 10.7221 21.1613C10.3689 20.8073 10.1923 20.3817 10.1923 19.8846H13.8077C13.8077 20.3833 13.6305 20.8093 13.2761 21.1625C12.9218 21.5157 12.4959 21.6923 11.9983 21.6923ZM7.80765 17.3846H16.1923V9.92305C16.1923 8.76535 15.783 7.77721 14.9644 6.95863C14.1458 6.14003 13.1577 5.73073 12 5.73073C10.8423 5.73073 9.85413 6.14003 9.03555 6.95863C8.21695 7.77721 7.80765 8.76535 7.80765 9.92305V17.3846Z"
                fill="black"
              />
            </svg>
          </Link>
        </NavBox>
      </Top>

      <Season>
        <div className="season__title">淸明</div>
        <div className="season__description">청명, 5번째 절기</div>
      </Season>

      <FortuneContainer>
        <Fortune onClick={Open}>
          <div className="fortune__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M10.4286 7.57067L10.4286 0.935057L3.79297 0.935059L3.79297 7.57067"
                stroke="black"
                stroke-width="0.8"
                stroke-linejoin="round"
              />
              <path
                d="M10.2949 0.935059L1.61492 9.61506L4.99966 12.9998L9.33966 8.6598L10.4247 7.5748"
                stroke="black"
                stroke-width="0.8"
                stroke-linejoin="round"
              />
              <path
                d="M4.16208 0.935083L12.8421 9.61508L9.45735 12.9998L7.28735 10.8298"
                stroke="black"
                stroke-width="0.8"
                stroke-linejoin="round"
              />
            </svg>
            <div>오늘의 운세</div>
          </div>
          <div className="fortune__date">11월 18일</div>
        </Fortune>
      </FortuneContainer>
      <PopupLayout>{showPopup && <Popup onClose={Close} />}</PopupLayout>

      <Category>
        <Year>2023</Year>
        <Select>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="year">연도별 보기</option>
            <option value="season">절기별 보기</option>
          </select>
          <img src={arrow_svg} />
        </Select>
      </Category>

      <ContentArea>
        {selectedCategory === 'year' && <YearlyContent />}
        {selectedCategory === 'season' && <SeasonalContent />}
      </ContentArea>

      <TabBar />
    </>
  );
};

export default HomePage;
