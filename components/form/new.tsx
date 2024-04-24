import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useForm } from "react-hook-form";

export default function NewForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log({ data });
    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log({ response });

      alert("Wish submitted successfully!");
    } catch (error) {
      console.error("Failed to submit wish:", error);
      alert("Failed to submit the wish");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        isRequired
        label="Title"
        placeholder="Your wish tagline"
        type="text"
        {...register("title", { required: true })}
      />
      {errors.title && (
        <p className="font-bold text-danger">Title is required.</p>
      )}
      <Textarea
        label="Description"
        placeholder="Optional additional context"
        {...register("description")}
      />
      <Input
        label="Username"
        placeholder="Your username"
        type="text"
        {...register("author")}
      />
      <Input
        label="Resource URL"
        placeholder="Any resource link?"
        type="text"
        {...register("resource")}
      />
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary">
          Submit your wish
        </Button>
      </div>
    </form>
  );
}
