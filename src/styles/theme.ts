import { DefaultTheme } from 'styled-components';

const theme = {
  borderRadius: `14px`,
  buttonStyle: `
    all: unset;
    display: block;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    `,
  containerStyle: `
    position: relative;

    padding: 0 24px;
    margin: 16px auto;
  `,
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  mobileNavHeight: '40px',
};

const darkTheme: DefaultTheme = {
  color: {
    textColor: '#f5f6fa',
    bgColor: '#2f3640',
    accentColor: '#D6AB00',
    sectionColor: 'rgba(0, 0, 0, 0.5)',
  },
  ...theme,
};

const lightTheme: DefaultTheme = {
  color: {
    textColor: '#2f3640',
    bgColor: 'whitesmoke',
    accentColor: '#D6AB00',
    sectionColor: 'rgba(255, 255, 255, 0.5)',
  },
  ...theme,
};

export { darkTheme, lightTheme };
