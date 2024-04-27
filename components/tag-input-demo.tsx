import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "@/components/tag-input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function TagForm({ tags, setTags, onGetNewsletter }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onGetNewsletter();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div id="try" className="w-full py-8">
      <div className="w-full relative my-4 flex flex-col space-y-2">
        <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-start"
            >
              <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left text-lg">Topics</FormLabel>
                    <FormControl>
                      <TagInput
                        {...field}
                        placeholder="Enter a topic"
                        tags={tags}
                        className="sm:min-w-[450px]"
                        setTags={(newTags) => {
                          setTags(newTags);
                          setValue("topics", newTags as [Tag, ...Tag[]]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                        Type a topic and press enter to add it to the list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Find cool things</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
