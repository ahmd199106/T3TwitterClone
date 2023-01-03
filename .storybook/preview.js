import { MantineProvider } from "@mantine/core";
import React from "react";
import { theme } from "./theme";

// Create a wrapper component that will contain all your providers.
// Usually you should render all providers in this component:
// MantineProvider, NotificationsProvider, ModalsProvider, SpotlightProvider, etc.
// export const MantineProviderWrapper = ({ children }) => {
//   return (
//     <MantineProvider theme={theme}>
//       {children}
//     </MantineProvider>
//   );
// };
function ThemeWrapper(props) {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [
  (renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
