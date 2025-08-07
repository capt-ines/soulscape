// components/SortableGrid.tsx
"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import SortableItem from "./SortableItem";

export default function SortableGrid({ items }) {
  const [activeItems, setActiveItems] = useState(items.map((i) => i.id));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = activeItems.indexOf(active.id);
      const newIndex = activeItems.indexOf(over.id);

      setActiveItems(arrayMove(activeItems, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={activeItems} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 gap-4">
          {activeItems.map((id) => {
            const item = items.find((i) => i.id === id);
            return <SortableItem key={id} id={id} item={item} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
