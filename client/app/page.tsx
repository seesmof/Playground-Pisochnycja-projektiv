import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto w-full p-3 md:mt-5 flex">
        <Tabs defaultValue="shop" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="garage">Garage</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
