"use client";

import { useTransition, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { InferSelectModel } from "drizzle-orm";

import { todosTable } from "@/db/schema";
import { removeTodoAction, toggleTodoAction } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

export function Todo({ item }: { item: InferSelectModel<typeof todosTable> }) {
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update window size when mounted
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener("resize", updateWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  // Handle toggle and trigger confetti if todo becomes completed
  const handleToggle = async () => {
    // If the todo is currently not completed, toggling will complete it
    if (!item.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    }

    startTransition(async () => {
      await toggleTodoAction(item.id);
    });
  };

  const handleRemove = async () => {
    startTransition(async () => {
      await removeTodoAction(item.id);
    });
  };

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Card className="bg-white/5 border-none text-white">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={!!item.completed}
              onCheckedChange={handleToggle}
              disabled={isPending}
              className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <span
              className={`flex-1 ${
                item.completed ? "line-through text-white/50" : ""
              }`}
            >
              {item.description}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 text-white/70 hover:text-white h-8 w-8"
            onClick={handleRemove}
            disabled={isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
