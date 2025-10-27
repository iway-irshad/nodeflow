import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
  });

    return { success: true, message: 'AI request sent' };
  }),
  getWorkflows: protectedProcedure
    .query(() => {
      return prisma.workflow.findMany();
    }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test2@iway.io"
      },
    });

    return { success: true, message: "Job queued" };
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;