import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function IndexPage() {
  return (
    <div className="flex bg-sky-50 min-h-screen items-center justify-center px-4">
      <ResizablePanelGroup
        className="bg-white rounded-md max-w-md"
        orientation="horizontal"
      >
        <ResizablePanel className="p-3">Sidebar</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-3">Main Panel</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
