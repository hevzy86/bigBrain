"use client";
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
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  // title: z.string().min(1).max(250).nonempty("Title is required"),

  title: z
    .string()
    .min(1, "Title is required")
    .max(5000, "Title must be at most 5000 characters"),
  file: z.instanceof(File),
});

export default function UploadDocumentForm({
  onUpload,
}: {
  onUpload: () => void;
}) {
  const createDocument = useMutation(
    api.documents.createDocument
  );

  const generateUploadUrl = useMutation(
    api.documents.generateUploadUrl
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = await generateUploadUrl();

    console.log(url);

    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": values.file.type },
      body: values.file,
    });

    const { storageId } = await result.json();

    setIsSubmitting(true);

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.log("Submitting:", values);
    // console.log("Storageid: " + storageId);
    await createDocument({
      title: values.title,
      fileId: storageId as Id<"_storage">,
    });
    onUpload();
    setIsSubmitting(false);
  }

  function handleSubmit(
    onSubmit: (
      e: React.FormEvent<HTMLFormElement>,
      values: z.infer<typeof formSchema>
    ) => Promise<void>
  ) {
    throw new Error("Function not implemented.");
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

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
                  placeholder="Document Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({
            field: { value, onChange, ...fieldProps },
          }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept=".txt,.xml,.doc,.docx"
                  onChange={(ev) => {
                    const file = ev.target.files?.[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={isSubmitting}
          loadingText="Uploading..."
          children="Upload"
        />
      </form>
    </Form>
  );
}
