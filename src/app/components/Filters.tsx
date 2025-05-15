import type { AvailableFilter } from "@/app/types/listing";

import { useState } from "react";

import Dropdown from "@/app/components/Dropdown";
import Chips from "@/app/components/Chips";

interface Props {
  availableFilters: AvailableFilter[];
  className?: string;
  filters: Record<string, string[]>;
  onChange: (filters: Record<string, string[]>) => void;
}

export default function Filters({
  availableFilters,
  className,
  filters,
  onChange,
}: Props) {
  const [showFilter, setShowFilter] = useState("");

  const handleFilterChange = (key: AvailableFilter["value"], value: string) => {
    if (filters[key]?.includes(value)) {
      if (filters[key].length === 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...restFilters } = filters;
        onChange(restFilters);
      } else {
        onChange({
          ...filters,
          [key]: filters[key].filter((filter) => filter !== value),
        });
      }
    } else {
      onChange({
        ...filters,
        [key]: [...(filters[key] || []), value],
      });
    }
  };

  return (
    <ul className={className}>
      {availableFilters.map((availableFilter) => (
        <li key={availableFilter.value}>
          <Dropdown
            open={showFilter === availableFilter.value}
            title={availableFilter.label}
            contentClassName="fixed left-4 right-4 md:absolute md:left-auto md:right-0"
            onChange={(open) =>
              setShowFilter(open ? availableFilter.value : "")
            }
          >
            <ul className="flex flex-wrap md:w-max md:grid md:grid-cols-2 lg:grid-cols-3">
              {availableFilter.options.map((option) => (
                <li key={option.value} className="m-2">
                  <Chips
                    name={`${availableFilter.value}_${option.value}`}
                    value={option.value}
                    checked={
                      filters[availableFilter.value]?.includes(option.value) ??
                      false
                    }
                    onChange={() =>
                      handleFilterChange(availableFilter.value, option.value)
                    }
                  >
                    {option.label}
                  </Chips>
                </li>
              ))}
            </ul>
          </Dropdown>
        </li>
      ))}
    </ul>
  );
}
