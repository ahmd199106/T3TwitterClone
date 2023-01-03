import { Button, Flex, Input, Text } from "@mantine/core";
import React, { useState } from "react";
import { z } from "zod";
import { trpc } from "../utils/trpc";

// type CreateTweetProps = {

// };

export const tweetSchema = z.object({
  text: z.string({ required_error: "Tweet text is required" }).min(10).max(280),
});

const CreateTweet: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.tweet.timeline.invalidate();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);

    try {
      await tweetSchema.parse({ text });
    } catch (error: any) {
      setError(error.errors[0].message);
      return;
    }

    mutateAsync({ text });
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="What's happening?"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Flex justify="flex-end">
        <Button color="primaryColor" type="submit" ml="50px" radius={"xl"}>
          Tweet
        </Button>
      </Flex>
      <Text>{error && JSON.stringify(error)}</Text>
    </form>
  );
};
export default CreateTweet;
