import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      sectionColor: string;
    };
    borderRadius: string;
    buttonStyle: string;
    containerStyle: string;
    flexCenter: string;
    mobileNavHeight: string;
  }
}
