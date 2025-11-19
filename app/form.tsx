"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addTodo } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormAction = async (formData: FormData) => {
    await addTodo(formData);
    formRef.current?.reset();
  };

  return (
    <Card className="bg-brunswick-green border-none shadow-sm">
      <CardContent className="p-4">
        <form
          action={handleFormAction}
          className="flex items-center gap-3"
          ref={formRef}
        >
          <div className="flex items-center justify-center w-6">
            <span className="text-xl">☑️</span>
          </div>
          <Input
            id="description"
            name="description"
            placeholder="Insert new todo"
            className="flex-1 bg-transparent border-none text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto"
            required
            aria-label="Description of todo"
            type="text"
            autoFocus
            autoComplete="off"
          />
          <Submit />
        </form>
      </CardContent>
    </Card>
  );
}

export function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      className="hover:bg-white/10 text-white hover:text-white h-8 w-8"
    >
      <Plus className="h-5 w-5" />
      <span className="sr-only">Add</span>
    </Button>
  );
}
