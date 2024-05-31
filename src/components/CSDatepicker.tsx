import { Datepicker } from 'flowbite-react';
import { forwardRef } from 'react';

import type { DatepickerProps } from 'flowbite-react';
import type { DatepickerRef } from 'node_modules/flowbite-react/dist/types/components/Datepicker/Datepicker';

interface CSDatepickerProps extends Omit<DatepickerProps, 'onChange'> {
  onChange: (date: Date | undefined | null) => void;
}

export const CSDatepicker = forwardRef<DatepickerRef, CSDatepickerProps>(
  ({ value, onChange, onBlur, className, ...rest }, ref) => {
    const handleDateChange = (date: Date | null) => {
      onChange(date);
    };

    return (
      <Datepicker
        value={value}
        color=""
        onSelectedDateChanged={handleDateChange}
        onBlur={onBlur}
        ref={ref}
        className={className}
        {...rest}
      />
    );
  },
);

CSDatepicker.displayName = 'CSDatepicker';
