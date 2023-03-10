import { router, protectedProcedure, publicProcedure } from "../trpc";
import { tweetSchema } from "./../../../components/CreateTweet";
import { z } from "zod";

export const tweetRouter = router({
  create: protectedProcedure.input(tweetSchema).mutation(({ input, ctx }) => {
    const { prisma, session } = ctx;

    const { text } = input;
    const userId = session.user.id;
    return prisma.tweet.create({
      data: {
        text,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }),
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;
      const userId = ctx.session?.user?.id;

      const tweets = await prisma.tweet.findMany({
        take: limit + 1,
        // where,
        orderBy: [{ createdAt: "desc" }],
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          likes: {
            where: {
              userId,
            },
            select: {
              userId: true,
            },
          },
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (tweets.length > limit) {
        const nextItem = tweets.pop() as typeof tweets[number];

        nextCursor = nextItem.id;
      }
      return {
        tweets,
        nextCursor,
      };
    }),
  like: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const userId = session.user.id;
      const { tweetId } = input;

      return prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: input.tweetId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const userId = session.user.id;
      const { tweetId } = input;

      return prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId: input.tweetId,
            userId,
          },
        },
      });
    }),
});
