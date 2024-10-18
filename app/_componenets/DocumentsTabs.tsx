import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
export function DocumentsTabs() {
  return (
    <Tabs
      defaultValue="document"
      className="w-[400px]"
    >
      <TabsList>
        <TabsTrigger value="document">Document</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="document">
        Make changes to your document here.
      </TabsContent>
      <TabsContent value="chat">
        Change your chat here.
      </TabsContent>
    </Tabs>
  );
}
