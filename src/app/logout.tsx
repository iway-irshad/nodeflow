"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  return <Button onClick={() => authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push("/login");
        toast.success("You have been logged out successfully.");
      },
      onError: (ctx) => {
        toast.error(`Logout failed: ${ctx.error.message}`);
      },
    }
  })}>Logout</Button>;
};

export default LogoutButton;