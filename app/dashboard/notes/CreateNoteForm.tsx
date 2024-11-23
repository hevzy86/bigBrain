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
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";
import CreateNoteButton from "./CreateNoteButton";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/app/_componenets/LoadingButton";

const formSchema = z.object({
  // title: z.string().min(1).max(250).nonempty("Title is required"),

  text: z
    .string()
    .min(1, "Title is required")
    .max(5000, "Title must be at most 5000 characters"),
  // file: z.instanceof(File),
});

export default function CreateNoteForm({
  onNoteCreated,
}: {
  onNoteCreated: () => void;
}) {
  const createNote = useMutation(api.notes.createNote);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true); // Disable button
    try {
      await createNote({ text: values.text });
      onNoteCreated();
      console.log("onSubmitTriggered");
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Your Note"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={isSubmitting}
          loadingText="Creating..."
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  );
}
