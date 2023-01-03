import { Button, Flex } from "@mantine/core";
import React, { useEffect } from "react";
import CreateTweet from "./CreateTweet";
import SingleTweet from "./SingleTweet";
import { RouterOutputs, trpc } from "../utils/trpc";
import type { RouterInputs } from "../utils/trpc";
import {
  InfiniteData,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import useScrollPosition from "../utils/useScrollPosition";

// type TimelineProps = {};

export function Timeline(
  {
    //   where = {},
    // }: {
    //   where: RouterInputs["tweet"]["timeline"]["where"];
  }
) {
  const scrollPosition = useScrollPosition();

  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {
        limit: 10,
        //  where
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  console.log("tweets destructured", tweets);

  return (
    <Flex>
      <CreateTweet />
      {tweets.map((tweet) => (
        <SingleTweet key={tweet.id} tweet={tweet} />
      ))}
      {!hasNextPage && <p>No more items to load</p>}
      <Button
        disabled={!hasNextPage && !isFetching}
        onClick={() => fetchNextPage()}
      >
        Load more
      </Button>
    </Flex>
  );
}
