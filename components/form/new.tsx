"use client";

import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { createWish } from "@/app/actions";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

export default function NewForm() {
  const { pending } = useFormStatus();

  return (
    <form
      className="flex flex-col gap-4"
      action={(formData) =>
        toast.promise(createWish(formData), {
          success: "Wish successfully created!",
          error: (error) => error,
        })
      }
    >
      <Input
        isRequired
        id="title"
        name="title"
        label="Title"
        placeholder="Your wish tagline"
        type="text"
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        placeholder="Optional additional context"
      />
      <Input
        id="author"
        name="author"
        label="Username"
        placeholder="Your username"
        type="text"
      />
      <Input
        id="resource"
        name="resource"
        label="Resource URL"
        placeholder="Any resource link?"
        type="text"
      />
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" aria-disabled={pending}>
          Submit your wish
        </Button>
      </div>
    </form>
  );
}
