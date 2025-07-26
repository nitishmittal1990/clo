import { useProductStore } from '../store';

export default function SearchBar() {
  const { filter, setSearchKeyword } = useProductStore();

  return (
    <div className="flex items-center rounded-lg bg-secondary p-4">
      <input
        type="text"
        placeholder="Find the items you're looking for"
        className="flex-1 border-none bg-transparent text-lg text-white outline-none placeholder:text-gray-400"
        value={filter.searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        aria-label="Search contents"
      />
      {filter.searchKeyword && (
        <button
          onClick={() => setSearchKeyword('')}
          className="ml-2 rounded text-xl text-white hover:text-[#1ED760] focus:outline-none focus:ring-2 focus:ring-[#00E6F6]"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <span className="ml-2 cursor-pointer text-2xl" aria-hidden="true">
        <img src="/images/search.svg" alt="Search" className="h-6 w-6" />
      </span>
    </div>
  );
}
