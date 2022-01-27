import styled, { keyframes } from 'styled-components';

const Container = styled.section`
  ${(props) => props.theme.containerStyle};
  ${(props) => props.theme.flexColumn('center', 'center')};
  gap: 32px;

  background-color: ${(props) => props.theme.color.bgColor};
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const IconContainer = styled.section`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 105%;
    left: 50%;
    transform: translateX(-50%);

    height: 0.3rem;
    width: 1.8rem;
    background: ${(props) => props.theme.color.textColor};
    opacity: 0.3;
    border-radius: 100%;
  }
`;

const Icon = styled.img`
  width: 5rem;
  height: 5rem;
  animation: ${rotateAnimation} 2s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.textColor};

  strong {
    color: ${(props) => props.theme.color.accentColor};
  }
`;

const Loader = () => {
  return (
    <Container>
      <IconContainer>
        <a
          href="https://www.iconfinder.com/iconsets/social-icons-33"
          target="_blank"
          rel="noreferrer"
        >
          <Icon src="/assets/theCoin.png" alt="Website icon" />
        </a>
      </IconContainer>
      <Title>
        the<strong>Coin</strong>
      </Title>
    </Container>
  );
};

export default Loader;
