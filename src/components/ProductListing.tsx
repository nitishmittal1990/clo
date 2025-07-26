import { useState, useEffect } from 'react';
import ProductItems from './ProductItems';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import { useProductStore } from '../store';
import { useUrlSync } from '../hooks/useUrlSync';

export default function ProductListing() {
  const fetchItems = useProductStore((s) => s.fetchProducts);
  const filter = useProductStore((s) => s.filter);
  const setPricingOptions = useProductStore((s) => s.setPricingOptions);
  const setSearchKeyword = useProductStore((s) => s.setSearchKeyword);
  const error = useProductStore((s) => s.error);
  const clearError = useProductStore((s) => s.clearError);
  const [loading, setLoading] = useState(true);

  // Use custom hook for URL synchronization
  useUrlSync({ filter, setPricingOptions, setSearchKeyword });

  // Fetch data on mount
  useEffect(() => {
    fetchItems().finally(() => setLoading(false));
  }, []);

  // Retry if API fails
  const handleRetry = () => {
    setLoading(true);
    clearError();
    fetchItems().finally(() => setLoading(false));
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
