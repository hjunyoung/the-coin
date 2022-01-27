import { DefaultTheme } from 'styled-components';

const theme = {
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

  mobileNavHeight: '40px',
  boxShadow: `rgba(70, 70, 70, 0.16) 0px -1px 6px,
  rgba(70, 70, 70, 0.23) 0px 4px 6px, rgba(70, 70, 70, 0.16) 0px 0px 6px,
  rgba(70, 70, 70, 0.23) 2px 0px 6px`,

};

const darkTheme: DefaultTheme = {
  color: {
    textColor: '#f5f6fa',
    bgColor: '#2f3640',
    accentColor: '#D6AB00',
    sectionColor: 'rgba(0, 0, 0, 0.5)',
    chartUpColor: '#2DCD71',
    chartDownColor: '#E54C3D',
  },
  border: {
    borderRadius: `14px`,
    primaryBorder: '#f5f6fa',
    secondaryBorder: '#f5f6fa70',
    tertiaryBorder: '#f5f6fa60',
  },
  ...theme,
};

const lightTheme: DefaultTheme = {
  color: {
    textColor: '#2f3640',
    bgColor: 'whitesmoke',
    accentColor: '#D6AB00',
    sectionColor: 'rgba(255, 255, 255, 0.5)',
    chartUpColor: '#2DCD71',
    chartDownColor: '#E54C3D',
  },
  border: {
    borderRadius: `14px`,
    primaryBorder: '#2f3640',
    secondaryBorder: '#2f364070',
    tertiaryBorder: '#2f364060',
  },
  ...theme,
};

export { darkTheme, lightTheme };
