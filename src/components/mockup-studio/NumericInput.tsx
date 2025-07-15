import React, { useCallback } from "react";
import { NumericFormat } from "react-number-format";

import { Input } from "../ui/input";

interface NumericInputProps {
  profile: Record<string, number>;
  setProfile: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  id: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  profile,
  setProfile,
  id,
}) => {
  const MAXNUMVALUE = 1000000000000;

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const numericValue = e.target.value.replace(/,/g, "");
      if (!isNaN(Number(numericValue)) && numericValue.trim() !== "") {
        setProfile((prev) => ({
          ...prev,
          [id]: Number(numericValue),
        }));
      }
    },
    [id, setProfile],
  );

  return (
    <NumericFormat
      customInput={Input}
      value={profile[id]}
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
