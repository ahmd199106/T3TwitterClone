// // .storybook/preview.tsx

// import { MantineProvider } from "@mantine/core";
// import React from "react";
// // import theme object you've exported in previous step
// import { theme } from "./theme";

// // Create a wrapper component that will contain all your providers.
// // Usually you should render all providers in this component:
// // MantineProvider, NotificationsProvider, ModalsProvider, SpotlightProvider, etc.
// function ThemeWrapper(props: { children: React.ReactNode }) {
//   return (
//     <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
//       {props.children}
//     </MantineProvider>
//   );
// }

// // enhance your stories with decorator that uses ThemeWrapper
// export const decorators = [
//   (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
// ];

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// };
