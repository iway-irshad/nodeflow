"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { email, z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const signupSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
    const router = useRouter();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = async (values: SignupFormValues) => {
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: "/",
            },
            
            {
                onSuccess: () => {
                    toast.success("Signup successful! You are now signed in.");
                    router.push("/");
                },
                onError: (ctx) => {
                    toast.error(`Signup failed: ${ctx.error.message}`);
                },
            }
        );
        
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6 ">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started!
                    </CardTitle>
                    <CardDescription>
                        Create a new account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending} className="w-full">
                                        Continue with Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending} className="w-full">
                                        Continue with GitHub
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isPending} className="w-full">
                                        {isPending ? "Signing up..." : "Sign up"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4 hover:text-blue-600"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

