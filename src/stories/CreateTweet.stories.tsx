import React from "react";

import CreateTweet from "./CreateTweet";
import type { ComponentMeta } from "@storybook/react";

// const createTweetStories = {
export default {
  title: "Example/CreateTweet",
  component: CreateTweet,
} as ComponentMeta<typeof CreateTweet>;

// Export the object as the default export
// export default createTweetStories as ComponentMeta<typeof CreateTweet>;

// export default {
//   title: "Pages/Home",
//   component: Home,
// };

export const CreateTweets = () => <CreateTweet />;

//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof Home>;
// const Template: ComponentStory<typeof Home> = (args) => (
//     <Home {...args} />
// );
// export const Default = Template.bind({});
// Default.args = {
