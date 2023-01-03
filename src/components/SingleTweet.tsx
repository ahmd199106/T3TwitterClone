import { Flex, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { trpc } from "../utils/trpc";
import type { RouterOutputs } from "../utils/trpc";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { AiFillHeart } from "react-icons/ai";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

type SingleTweetProps = {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
};

const SingleTweet: React.FC<SingleTweetProps> = ({ tweet }) => {
  const utils = trpc.useContext();

  const likeMutation = trpc.tweet.like.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      utils.tweet.timeline.invalidate();
    },
  }).mutateAsync;
  const unlikeMutation = trpc.tweet.unlike.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      utils.tweet.timeline.invalidate();
    },
  }).mutateAsync;
  const hasLiked = tweet.likes.length > 0;

  return (
    <Flex
      direction="row"
      gap="0"
      style={{
        border: "1px solid lightgray",
        borderRadius: "10px",
      }}
    >
      <Flex direction={"column"}>
        <Flex>
          {tweet.author.image && (
            <Image
              src={tweet.author.image}
              alt="profile image"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          )}
          <Flex direction="column">
            <Flex>
              <Text>{tweet.author.name}</Text>
              <Text> - {dayjs(tweet.createdAt).fromNow()} ago</Text>
            </Flex>
            <Text>{tweet.text}</Text>
          </Flex>
        </Flex>
        <Flex>
          <AiFillHeart
            color={hasLiked ? "red" : "gray"}
            size="1.5rem"
            onClick={() => {
              if (hasLiked) {
                console.log("unliked tweet");

                unlikeMutation({
                  tweetId: tweet.id,
                });
                return;
              }

              likeMutation({
                tweetId: tweet.id,
              });
            }}
          />

          <span className="text-sm text-gray-500">{tweet._count.likes}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleTweet;
