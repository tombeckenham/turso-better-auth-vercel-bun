import { Todos } from "@/app/todos";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="bg-background border-border">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="text-3xl font-black tracking-tight">
            Todos
          </CardTitle>
          <CardDescription>
            The todos you add below are created inside your own database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Todos />
        </CardContent>
      </Card>
    </div>
  );
}
