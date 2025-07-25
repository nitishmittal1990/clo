import type { PricingOption, IProductItem, FilterState } from './interface';

export function mapPricingOption(option: number): PricingOption {
  if (option === 0) return 'paid';
  if (option === 1) return 'free';
  return 'viewOnly';
}

export function filterAndSearch(contents: IProductItem[], filter: FilterState) {
  let filtered = contents;
  if (filter.pricingOptions.length > 0) {
    filtered = filtered.filter((item) => filter.pricingOptions.includes(item.pricing));
  }
  if (filter.keyword.trim()) {
    const keyword = filter.keyword.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) || item.userName.toLowerCase().includes(keyword)
    );
  }
  return filtered;
}
