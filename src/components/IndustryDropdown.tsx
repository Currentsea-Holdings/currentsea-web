import { AngleDown, Close } from 'flowbite-react-icons/outline';
import { startTransition, useMemo, useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';
import { INDUSTRIES } from '@/utils/constants/industries.constants';

interface Industry {
  id: number;
  name: string;
}

interface IndustryDropdownProps {
  selectedIndustries: Industry[];
  onSelectIndustry: (industry: Industry) => void;
  onRemoveIndustry: (industry: Industry) => void;
}

export const IndustryDropdown = ({
  selectedIndustries,
  onSelectIndustry,
  onRemoveIndustry,
}: IndustryDropdownProps) => {
  const [isOpen, toggleDropdown] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => {
    if (isOpen) toggleDropdown(false);
  });

  const industryOptions = INDUSTRIES;

  const sortedIndustryOptions = useMemo(() => {
    return [...industryOptions].sort((a, b) => a.name.localeCompare(b.name));
  }, [industryOptions]);

  const handleIndustrySelect = (industry: Industry) => {
    startTransition(() => {
      if (selectedIndustries.some((ind) => ind.id === industry.id)) {
        onRemoveIndustry(industry);
      } else if (selectedIndustries.length < 3) {
        onSelectIndustry(industry);

        if (selectedIndustries.length === 2) {
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
        <span className="text-dark">{selectedIndustries.length} out of 3 selected</span>
        <AngleDown className="ml-2 h-5 w-5 text-dark group-hover:text-gray-50" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-md bg-white shadow-lg">
          <ul
            className="py-1 text-gray-700"
            aria-labelledby="dropdownButton"
          >
            {sortedIndustryOptions.map((industry) => {
              const isIndustrySelected = selectedIndustries.some((ind) => ind.id === industry.id);

              return (
                <button
                  type="button"
                  key={industry.id}
                  className={`block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 ${
                    selectedIndustries.length >= 3 && !isIndustrySelected
                      ? '!cursor-not-allowed opacity-50'
                      : ''
                  }`}
                  onClick={() => {
                    handleIndustrySelect(industry);
                  }}
                  disabled={selectedIndustries.length >= 3 && !isIndustrySelected}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isIndustrySelected}
                      readOnly
                      className="form-checkbox h-4 w-4 rounded-full border-primary text-primary transition duration-150 ease-in-out focus:ring-0"
                      disabled={selectedIndustries.length >= 3 && !isIndustrySelected}
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
        {selectedIndustries.map((industry) => (
          <div
            key={industry.id}
            className="flex items-center space-x-2 rounded bg-primary-light-20 px-2 py-1 text-white"
          >
            <span>{industry.name}</span>
            <button
              type="button"
              className="text-white"
              onClick={() => {
                onRemoveIndustry(industry);
              }}
            >
              <Close size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
