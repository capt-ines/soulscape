import React, { useCallback } from "react";
import { NumericFormat } from "react-number-format";

import { MockupType } from "@/types/MockupType";

import { Input } from "../ui/input";

interface NumericInputProps {
  presentMockup: MockupType;
  setMockup: React.Dispatch<MockupType>;
  id: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  presentMockup,
  setMockup,
  id,
}) => {
  const MAXNUMVALUE = 1000000000000;

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const numericValue = e.target.value.replace(/,/g, "");
      if (!isNaN(Number(numericValue)) && numericValue.trim() !== "") {
        setMockup({
          ...presentMockup,
          mockup: { ...presentMockup.mockup, [id]: Number(numericValue) },
        });
      }
    },
    [id, setMockup],
  );

  return (
    <NumericFormat
      customInput={Input}
      value={presentMockup.mockup[id]}
      onBlur={handleBlur}
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue !== undefined && floatValue < MAXNUMVALUE;
      }}
      id={id}
      className="col-span-2 h-8"
      allowNegative={false}
      thousandSeparator=","
      allowLeadingZeros={false}
    />
  );
};

export default NumericInput;
