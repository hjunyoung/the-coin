import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const Mode = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;

  position: fixed;
  right: 8px;
  top: 4px;

  width: 44px;
  height: 24px;
  border: 1px solid black;
  border-radius: ${(props) => props.theme.borderRadius};

  background-color: ${(props) => props.theme.color.textColor};

  transition: background-color 0.3s linear;
  cursor: pointer;
  user-select: none;
`;

const IconsContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;

  position: relative;
  left: ${(props) => (props.isDark ? '-27px' : 0)};

  padding: 0 1px;
  transition: left 0.3s linear;
`;

const ModeIconContainer = styled.div`
  width: 21px;
  height: 21px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.bgColor};

  ${(props) => props.theme.flexCenter};
`;

const ModeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ModeToggleButton = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  return (
    <Mode onClick={() => setIsDark((current) => !current)}>
      <IconsContainer isDark={isDark}>
        <ModeIconContainer>
          <ModeIcon src="/assets/lightMode.png" alt="light mode" />
        </ModeIconContainer>
        <ModeIconContainer>
          <ModeIcon src="/assets/darkMode.png" alt="dark mode" />
        </ModeIconContainer>
      </IconsContainer>
    </Mode>
  );
};

export default ModeToggleButton;
