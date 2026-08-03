import { useStore } from "@/lib/store";

export default function Page() {
  const items = useStore((state: string[]) => state.items);

  return "Jesus is LORD";
}
