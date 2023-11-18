import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Top = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 24.375rem;
  height: 3rem;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  background: lightcoral;

  color: #000;
  font-family: AppleSDGothicNeoSB00;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SeasonBorder = styled.div`
  position: relative;
  margin: 0.3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 24rem;
  height: 5rem;
  // border: 1px solid #000;

  color: #000;
  text-align: center;
  font-family: Noto Serif KR;
  font-style: normal;
  font-weight: 600;
`;

const PicBorder = styled.div`
  position: relative;
  display: flex;
  margin: 0.3rem auto;
  overflow-x: auto;
  padding: 1rem;
  gap: 1rem;

  width: 22rem;
  //border: 1px solid red;
`;

const QuestionBorder = styled.div`
  position: relative;
  display: flex;
  margin: 0.3rem auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
  align-items: center;

  width: 22rem;
  height: auto;
  //border: 1px solid purple;

  color: #8e8c86;
  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`;

const Hr = styled.div`
  position: relative;
  display: flex;
  margin-right: 0.5rem;

  background: #919191;
  width: 0.125rem;
  height: 0.75rem;
`;

const Question = styled.div`
  color: #8e8c86;

  font-family: AppleSDGothicNeoB00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ContentBorder = styled.textarea`
  position: relative;
  display: flex;
  margin: 0.3rem auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;

  width: 22rem;
  height: 17rem;
  // border: 1px solid red;
  resize: none;

  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`;

const Chatbubble = styled.div`
  position: relative;
  display: flex;
  margin-top: -2rem;
  margin-left: 3.5rem;
  z-index: 2;
`;

const ButtonBorder = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 24rem;
  height: 2.7rem;
  // border: 1px solid green;
  background: red;

  font-family: AppleSDGothicNeoR00;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  color: #333;
`;

const data = [];

const WritePage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const isPicture = uploadedImages.length > 0;
  const [isQuestion, setIsQuestion] = useState(false);
  const [textareaContent, setTextareaContent] = useState('');

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    }
  };

  const questionRef = useRef(null);

  useEffect(() => {
    const hrElement = document.getElementById('hrElement');

    if (questionRef.current && hrElement) {
      const questionHeight = questionRef.current.getBoundingClientRect().height;
      hrElement.style.height = `${questionHeight}px`;
    }
  }, [isQuestion]);

  useEffect(() => {
    // Retrieve stored state from localStorage
    const storedImages =
      JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const storedQuestion =
      JSON.parse(localStorage.getItem('isQuestion')) || false;
    const storedTextareaContent = localStorage.getItem('textareaContent') || '';

    setUploadedImages(storedImages);
    setIsQuestion(storedQuestion);
    setTextareaContent(storedTextareaContent);
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleSave = () => {
    // Save state to localStorage
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
    localStorage.setItem('isQuestion', JSON.stringify(isQuestion));
    localStorage.setItem('textareaContent', textareaContent);
  };

  return (
    <>
      <Top>
        <svg
          style={{ marginLeft: '1rem' }}
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
        <div
          className="save"
          style={{ marginRight: '1rem' }}
          onClick={handleSave}
        >
          저장
        </div>
      </Top>
      <SeasonBorder>
        <span style={{ fontSize: '2rem' }}>立春</span>
        <span style={{ fontSize: '0.9375rem' }}>입춘</span>
      </SeasonBorder>
      {isPicture && (
        <PicBorder>
          {' '}
          {uploadedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Uploaded ${index + 1}`}
              style={{ width: '100%', height: '100%' }}
            />
          ))}
        </PicBorder>
      )}
      {isQuestion && (
        <QuestionBorder ref={questionRef}>
          <Hr id="hrElement"></Hr>
          <Question>
            질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.질문입니다요.v.
          </Question>
        </QuestionBorder>
      )}

      <ContentBorder placeholder="입춘은 봄의 시작입니다. 이번 봄, 당신은 어떤 것을 시작하셨나요? 시작할 때의 마음은 어떠셨나요?"></ContentBorder>
      <Chatbubble>
        <img
          src="images/ChatBubble.png"
          style={{ width: '17.75rem', height: '2.75rem', zIndex: '2' }}
        />
      </Chatbubble>
      <ButtonBorder>
        <label htmlFor="imageInput">
          <svg
            className="addpic"
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.3077 20.5C4.80257 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.3077C3.5 4.80257 3.675 4.375 4.025 4.025C4.375 3.675 4.80257 3.5 5.3077 3.5H18.6923C19.1974 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.80257 20.5 5.3077V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.3077ZM5.3077 19H18.6923C18.7692 19 18.8397 18.9679 18.9038 18.9038C18.9679 18.8397 19 18.7692 19 18.6923V5.3077C19 5.23077 18.9679 5.16024 18.9038 5.09613C18.8397 5.03203 18.7692 4.99998 18.6923 4.99998H5.3077C5.23077 4.99998 5.16024 5.03203 5.09612 5.09613C5.03202 5.16024 4.99997 5.23077 4.99997 5.3077V18.6923C4.99997 18.7692 5.03202 18.8397 5.09612 18.9038C5.16024 18.9679 5.23077 19 5.3077 19ZM6.75003 16.75H17.3269L14.0384 12.3654L11.2308 16.0192L9.23075 13.4616L6.75003 16.75Z"
              fill="black"
            />
          </svg>
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <svg
          className="private"
          style={{ marginLeft: '1rem' }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.3077 21.4999C5.80898 21.4999 5.38302 21.3233 5.02982 20.9701C4.67661 20.6169 4.5 20.1909 4.5 19.6922V10.3077C4.5 9.80893 4.67661 9.38297 5.02982 9.02977C5.38302 8.67656 5.80898 8.49995 6.3077 8.49995H7.5V6.49995C7.5 5.25125 7.93782 4.18908 8.81345 3.31345C9.6891 2.43782 10.7513 2 12 2C13.2487 2 14.3109 2.43782 15.1865 3.31345C16.0621 4.18908 16.5 5.25125 16.5 6.49995V8.49995H17.6922C18.191 8.49995 18.6169 8.67656 18.9701 9.02977C19.3233 9.38297 19.5 9.80893 19.5 10.3077V19.6922C19.5 20.1909 19.3233 20.6169 18.9701 20.9701C18.6169 21.3233 18.191 21.4999 17.6922 21.4999H6.3077ZM6.3077 19.9999H17.6922C17.782 19.9999 17.8557 19.9711 17.9134 19.9134C17.9711 19.8557 18 19.7819 18 19.6922V10.3077C18 10.2179 17.9711 10.1442 17.9134 10.0865C17.8557 10.0288 17.782 9.99993 17.6922 9.99993H6.3077C6.21795 9.99993 6.14423 10.0288 6.08652 10.0865C6.02882 10.1442 5.99997 10.2179 5.99997 10.3077V19.6922C5.99997 19.7819 6.02882 19.8557 6.08652 19.9134C6.14423 19.9711 6.21795 19.9999 6.3077 19.9999ZM12 16.7499C12.4859 16.7499 12.899 16.5797 13.2394 16.2393C13.5798 15.899 13.75 15.4858 13.75 14.9999C13.75 14.514 13.5798 14.1009 13.2394 13.7605C12.899 13.4201 12.4859 13.25 12 13.25C11.5141 13.25 11.1009 13.4201 10.7606 13.7605C10.4202 14.1009 10.25 14.514 10.25 14.9999C10.25 15.4858 10.4202 15.899 10.7606 16.2393C11.1009 16.5797 11.5141 16.7499 12 16.7499ZM8.99997 8.49995H15V6.49995C15 5.66662 14.7083 4.95828 14.125 4.37495C13.5416 3.79162 12.8333 3.49995 12 3.49995C11.1666 3.49995 10.4583 3.79162 9.87497 4.37495C9.29164 4.95828 8.99997 5.66662 8.99997 6.49995V8.49995Z"
            fill="black"
          />
        </svg>
        <svg
          onClick={() => setIsQuestion(!isQuestion)}
          className="addQ"
          style={{ marginLeft: '1rem' }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.7499 14.7692C13.9948 14.7692 14.2086 14.6779 14.3913 14.4952C14.574 14.3125 14.6653 14.0987 14.6653 13.8538C14.6653 13.6089 14.574 13.3952 14.3913 13.2125C14.2086 13.0298 13.9948 12.9385 13.7499 12.9385C13.5051 12.9385 13.2913 13.0298 13.1086 13.2125C12.9259 13.3952 12.8345 13.6089 12.8345 13.8538C12.8345 14.0987 12.9259 14.3125 13.1086 14.4952C13.2913 14.6779 13.5051 14.7692 13.7499 14.7692ZM13.1538 11.7615H14.3461C14.3589 11.3102 14.4169 10.9753 14.5201 10.7567C14.6233 10.5381 14.8679 10.2423 15.2538 9.8692C15.7153 9.4269 16.0294 9.05318 16.1961 8.74805C16.3627 8.44293 16.4461 8.08845 16.4461 7.6846C16.4461 6.97307 16.1948 6.38621 15.6922 5.92403C15.1897 5.46184 14.5422 5.23075 13.7499 5.23075C13.1307 5.23075 12.5862 5.40158 12.1163 5.74325C11.6464 6.08492 11.3051 6.54357 11.0922 7.1192L12.173 7.57305C12.3422 7.1692 12.5592 6.86632 12.824 6.6644C13.0887 6.46247 13.3974 6.3615 13.7499 6.3615C14.1884 6.3615 14.5486 6.48843 14.8307 6.74228C15.1128 6.99613 15.2538 7.33074 15.2538 7.74613C15.2538 7.99869 15.1823 8.23556 15.0394 8.45673C14.8964 8.67788 14.6487 8.94999 14.2961 9.27308C13.8102 9.69871 13.4983 10.057 13.3605 10.3481C13.2227 10.6391 13.1538 11.1102 13.1538 11.7615ZM8.05765 17.5C7.55252 17.5 7.12496 17.325 6.77498 16.975C6.42498 16.625 6.24998 16.1974 6.24998 15.6923V4.3077C6.24998 3.80257 6.42498 3.375 6.77498 3.025C7.12496 2.675 7.55252 2.5 8.05765 2.5H19.4422C19.9473 2.5 20.3749 2.675 20.7249 3.025C21.0749 3.375 21.2499 3.80257 21.2499 4.3077V15.6923C21.2499 16.1974 21.0749 16.625 20.7249 16.975C20.3749 17.325 19.9473 17.5 19.4422 17.5H8.05765ZM8.05765 16H19.4422C19.5191 16 19.5897 15.9679 19.6538 15.9038C19.7179 15.8397 19.7499 15.7692 19.7499 15.6923V4.3077C19.7499 4.23077 19.7179 4.16024 19.6538 4.09613C19.5897 4.03203 19.5191 3.99998 19.4422 3.99998H8.05765C7.98072 3.99998 7.9102 4.03203 7.8461 4.09613C7.78198 4.16024 7.74993 4.23077 7.74993 4.3077V15.6923C7.74993 15.7692 7.78198 15.8397 7.8461 15.9038C7.9102 15.9679 7.98072 16 8.05765 16ZM4.55768 20.9999C4.05256 20.9999 3.625 20.8249 3.275 20.4749C2.925 20.1249 2.75 19.6973 2.75 19.1922V6.3077H4.24998V19.1922C4.24998 19.2692 4.28203 19.3397 4.34613 19.4038C4.41024 19.4679 4.48076 19.5 4.55768 19.5H17.4422V20.9999H4.55768Z"
            fill="black"
          />
        </svg>
      </ButtonBorder>
    </>
  );
};

export default WritePage;
