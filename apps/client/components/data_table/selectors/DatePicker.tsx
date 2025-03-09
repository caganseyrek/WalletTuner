"use client";

import React from "react";

import { CalendarIcon } from "lucide-react";

import Formatter from "@/shared/lib/formatter";
import { cn } from "@/shared/lib/twUtils";

import { Button } from "../../base/button";
import { Calendar } from "../../base/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";

interface DatePickerProps {
  selectedDate?: string;
}

const DatePicker = ({ selectedDate }: DatePickerProps) => {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => setDate(selectedDate ? new Date(selectedDate) : undefined), [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full px-3 justify-start text-left font-normal", !date && "text-muted-foreground")}>
          <CalendarIcon />
          {date ? Formatter.formatDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-2 space-y-2" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
