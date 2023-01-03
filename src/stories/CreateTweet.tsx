import { Button, Input, Text } from "@mantine/core";
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
  const { mutateAsync } = trpc.tweet.create.useMutation();

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
      <Button color="primaryColor" type="submit" ml="50px" radius={"xl"}>
        Submit
      </Button>
      <Text>{error && JSON.stringify(error)}</Text>
    </form>
  );
};
export default CreateTweet;
