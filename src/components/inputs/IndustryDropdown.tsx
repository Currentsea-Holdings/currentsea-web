import { AngleDown, Close } from 'flowbite-react-icons/outline';
import { startTransition, useMemo, useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';

import { useIndustries } from '@/hooks/useIndustries';

import type { Industry } from '@/types';

interface IndustryDropdownProps {
  selectedIndustryIds: string[];
  onSelectIndustryId: (industryId: string) => void;
  onRemoveIndustryId: (industryId: string) => void;
}

export const IndustryDropdown = ({
  selectedIndustryIds,
  onSelectIndustryId,
  onRemoveIndustryId,
}: IndustryDropdownProps) => {
  const [isOpen, toggleDropdown] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => {
    if (isOpen) toggleDropdown(false);
  });

  const { industries } = useIndustries();

  const handleIndustrySelect = (industry: Industry) => {
    startTransition(() => {
      if (selectedIndustryIds.includes(industry.id)) {
        onRemoveIndustryId(industry.id);
      } else if (selectedIndustryIds.length < 3) {
        onSelectIndustryId(industry.id);

        if (selectedIndustryIds.length === 2) {
          setTimeout(() => {
            toggleDropdown(false);
          }, 200);
        }
      }
    });
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="group relative flex w-full cursor-default items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={() => {
          toggleDropdown();
        }}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <span className="text-dark">{selectedIndustryIds.length} out of 3 selected</span>
        <AngleDown className="ml-2 h-5 w-5 text-dark group-hover:text-gray-50" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-md bg-white shadow-lg">
          <ul
            className="py-1 text-gray-700"
            aria-labelledby="dropdownButton"
          >
            {industries?.map((industry) => {
              const isIndustrySelected = selectedIndustryIds.includes(industry.id);

              return (
                <button
                  type="button"
                  key={industry.id}
                  className={`block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 ${
                    selectedIndustryIds.length >= 3 && !isIndustrySelected
                      ? '!cursor-not-allowed opacity-50'
                      : ''
                  }`}
                  onClick={() => {
                    handleIndustrySelect(industry);
                  }}
                  disabled={selectedIndustryIds.length >= 3 && !isIndustrySelected}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isIndustrySelected}
                      readOnly
                      className="form-checkbox h-4 w-4 rounded-full border-primary text-primary transition duration-150 ease-in-out focus:ring-0"
                      disabled={selectedIndustryIds.length >= 3 && !isIndustrySelected}
                    />
                    <span className="flex-grow">{industry.name}</span>
                  </div>
                </button>
              );
            })}
          </ul>
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedIndustryIds.map((id) => {
          const industry = industries?.find((ind) => ind.id === id);
          return (
            <div
              key={id}
              className="flex items-center space-x-2 rounded bg-primary-light-20 px-2 py-1 text-white"
            >
              <span>{industry?.name}</span>
              <button
                type="button"
                className="text-white"
                onClick={() => {
                  onRemoveIndustryId(id);
                }}
              >
                <Close size={24} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
