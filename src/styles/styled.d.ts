import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      sectionColor: string;
      chartUpColor: string;
      chartDownColor: string;
    };
    border: {
    borderRadius: string;
      primaryBorder: string;
      secondaryBorder: string;
      tertiaryBorder: string;
    };
    buttonStyle: string;
    containerStyle: string;
    mobileNavHeight: string;
    boxShadow: string;
  }
}
