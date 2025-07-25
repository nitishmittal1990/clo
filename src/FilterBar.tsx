import { useContentStore, type PricingOption } from "./store";

const PRICING_OPTIONS: { label: string; value: PricingOption }[] = [
  { label: "Paid", value: "paid" },
  { label: "Free", value: "free" },
  { label: "View Only", value: "viewOnly" },
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
    <div className="bg-[#23262F] rounded-lg p-4 flex items-center gap-4">
      <span className="font-semibold text-[#00E6F6] text-base">
        Contents Filter
      </span>
      <div className="flex gap-3 ml-6">
        {PRICING_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5">
            <input
              type="checkbox"
              className="accent-[#00E6F6] focus:ring-2 focus:ring-[#00E6F6] rounded"
              checked={filter.pricingOptions.includes(opt.value)}
              onChange={() => handleChange(opt.value)}
              aria-label={`Toggle ${opt.label} filter`}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <button
        className="ml-auto bg-[#181A20] text-[#00E6F6] border border-[#00E6F6] rounded px-6 py-2 font-semibold hover:bg-[#23262F] transition focus:outline-none focus:ring-2 focus:ring-[#00E6F6]"
        onClick={resetFilters}
        aria-label="Reset filters"
      >
        RESET
      </button>
    </div>
  );
}
