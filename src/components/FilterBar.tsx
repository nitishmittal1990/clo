import type { PricingOption } from '../interface';
import { useContentStore } from '../store';

interface IPricingOption {
  label: string;
  value: PricingOption;
}

const PRICING_OPTIONS: IPricingOption[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Free', value: 'free' },
  { label: 'View Only', value: 'viewOnly' },
];

export default function FilterBar() {
  const { filter, setPricingOptions, resetFilters } = useContentStore();

  const handleChange = (option: PricingOption) => {
    const options = filter.pricingOptions.includes(option)
      ? filter.pricingOptions.filter((o) => o !== option)
      : [...filter.pricingOptions, option];
    setPricingOptions(options);
  };

  return (
    <div className="flex items-center gap-4 rounded-lg bg-[#23262F] p-4">
      <span className="text-base font-semibold text-accent">Pricing Options</span>
      <div className="ml-6 flex gap-3">
        {PRICING_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5">
            <input
              type="checkbox"
              className="rounded accent-[#00E6F6] focus:ring-2 focus:ring-[#00E6F6]"
              checked={filter.pricingOptions.includes(opt.value)}
              onChange={() => handleChange(opt.value)}
              aria-label={`Toggle ${opt.label} filter`}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <button
        className="ml-auto rounded border border-gray-500 bg-[#181A20] px-6 py-2 font-semibold text-[#00E6F6] transition hover:bg-[#23262F] focus:outline-none focus:ring-2 focus:ring-[#00E6F6]"
        onClick={resetFilters}
        aria-label="Reset filters"
      >
        RESET
      </button>
    </div>
  );
}
