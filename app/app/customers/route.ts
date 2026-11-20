import { Customer } from "@/lib/types";

export async function GET() {
  "use cache";

  const data: Customer[] = [
    { name: "Eugenia Gross", age: 37, email: "aviam@om.ac" },
    { name: "Anne Shaw", age: 36, email: "kakkihe@woiwe.org" },
    { name: "Lucille Maxwell", age: 48, email: "vof@su.gf" },
  ];

  return Response.json(data);
}
