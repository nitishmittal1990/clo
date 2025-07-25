import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductItems from './ProductItems';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import { useProductStore } from '../store';
import type { PricingOption } from '../interface';

export default function ProductListing() {
  const fetchContents = useProductStore((s) => s.fetchContents);
  const filter = useProductStore((s) => s.filter);
  const setPricingOptions = useProductStore((s) => s.setPricingOptions);
  const setKeyword = useProductStore((s) => s.setKeyword);
  const error = useProductStore((s) => s.error);
  const clearError = useProductStore((s) => s.clearError);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize filter/search from URL immediately on mount
  useEffect(() => {
    const pricing = searchParams.get('pricing');
    const keyword = searchParams.get('search') || '';
    if (pricing) {
      const options = pricing.split(',').filter(Boolean) as PricingOption[];
      setPricingOptions(options);
    }
    if (keyword) {
      setKeyword(keyword);
    }
    setIsInitialized(true);
    // eslint-disable-next-line
  }, [searchParams]);

  // Fetch data on mount
  useEffect(() => {
    fetchContents().finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  // On filter/search change: update URL only if different (skip initial render)
  useEffect(() => {
    if (!isInitialized) return;

    const params: Record<string, string> = {};
    if (filter.pricingOptions.length > 0) params.pricing = filter.pricingOptions.join(',');
    if (filter.keyword) params.search = filter.keyword;

    const currentPricing = searchParams.get('pricing') || '';
    const currentSearch = searchParams.get('search') || '';
    const paramsPricing = params.pricing || '';
    const paramsSearch = params.search || '';

    if (currentPricing !== paramsPricing || currentSearch !== paramsSearch) {
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line
  }, [filter.pricingOptions, filter.keyword, isInitialized]);

  const handleRetry = () => {
    setLoading(true);
    clearError();
    fetchContents().finally(() => setLoading(false));
  };

  return (
    <main className="container mx-auto py-8">
      {/* Search Bar */}
      <section className="mb-6">
        <SearchBar />
      </section>
      {/* Filter Bar */}
      <section className="mb-8">
        <FilterBar />
      </section>
      {/* Content List */}
      <section>
        {error ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center text-red-400">
            <span role="alert">{error}</span>
            <button
              className="rounded bg-[#1ED760] px-6 py-2 font-semibold text-[#181A20] transition hover:bg-[#00E6F6] hover:text-[#181A20]"
              onClick={handleRetry}
              aria-label="Retry loading contents"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="py-12 text-center text-gray-400">Loading...</div>
        ) : (
          <ProductItems />
        )}
      </section>
    </main>
  );
}
