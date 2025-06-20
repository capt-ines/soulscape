"use client";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

type TextArea = {
  defaultValue: string;
  rows?: number;
  maxLength?: number;
};

const TextArea = ({ defaultValue, rows, maxLength }: TextArea) => {
  return (
    <TextareaAutosize
      rows={rows}
      className="focus:bg-muted/40 resize-none px-1 py-0.5 focus:rounded-sm focus:outline-0"
      defaultValue={defaultValue}
      maxLength={maxLength}
    />
  );
};

export default TextArea;
