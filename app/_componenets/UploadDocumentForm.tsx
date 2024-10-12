"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { LoadingButton } from "@/components/loading-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createDocument } from "@/convex/documents";
import { useMutation } from "convex/react";

//import { Form, useForm } from "react-hook-form"

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.instanceof(File),
});

export default function UploadDocumentForm({
  onUpload,
}: {
  onUpload: () => void;
}) {
  // const organization = useOrganization();
  const createDocument = useMutation(
    api.documents.createDocument
  );

  
  // const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function getLog() {
    console.log("getDocument");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    getLog();

    console.log("onSubmit");
   await createDocument(values);
    onUpload();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Expense Report"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Upload</Button>
      </form>
    </Form>
  );
}
