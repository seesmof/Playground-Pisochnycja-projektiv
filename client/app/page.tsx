import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex bg-sky-50 min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">An auth test</CardTitle>
          <CardDescription>
            This is a simple app to test authentication in Next.js.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Link href={"/login"}>
            <Button>Log In</Button>
          </Link>
          <Link href={"/signup"}>
            <Button>Sign Up</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
