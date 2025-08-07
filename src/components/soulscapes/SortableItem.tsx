"use client";

import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Mockup } from "../mockup-studio/Mockup";
import { Card } from "../ui/card";

const animateLayoutChanges = ({ isSorting, wasDragging }) => {
  return isSorting && !wasDragging;
};

export default function SortableItem({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const isDragging = transform != null;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 300ms ease",
  };

  const renderContent = () => {
    switch (item.type) {
      case "image":
        return (
          <img
            src={item.data.url}
            alt={item.data.name}
            className="h-auto w-full"
          />
        );
      case "text":
        return <Card className="h-auto w-full"></Card>;
      case "journal":
        return <Card className="h-auto w-full"></Card>;
      case "affirmation":
        return <Card className="h-auto w-full"></Card>;
      case "mockup":
        return;
        <Mockup type="preview" presentMockup={item.data} />;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style} // <- DND controls transform/transition
      {...attributes}
      {...listeners}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-md border p-2 shadow-sm"
    >
      {renderContent()}
      <div className="mt-2 text-center">{item.name}</div>
    </motion.div>
  );
}
