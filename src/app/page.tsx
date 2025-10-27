"use client";

import { useTRPC } from "@/trpc/client";
import LogoutButton from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("AI Job queued...");
    }
  }));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued...");
    },
  }));
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected server component
      <div>
        <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>Test AI</Button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && (
          <div>
            <p>Workflows ({data.length}):</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        {!isLoading && !error && data?.length === 0 && (
          <p>No workflows found. Create one!</p>
        )}
      </div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;