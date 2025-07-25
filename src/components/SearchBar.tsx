import { useContentStore } from '../store';

export default function SearchBar() {
  const { filter, setKeyword } = useContentStore();

  return (
    <div className="flex items-center rounded-lg bg-secondary p-4">
      <input
        type="text"
        placeholder="Find the items you're looking for"
        className="flex-1 border-none bg-transparent text-lg text-white outline-none placeholder:text-gray-400"
        value={filter.keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="Search contents"
      />
      {filter.keyword && (
        <button
          onClick={() => setKeyword('')}
          className="ml-2 rounded text-xl text-[#00E6F6] hover:text-[#1ED760] focus:outline-none focus:ring-2 focus:ring-[#00E6F6]"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <span className="ml-2 cursor-pointer text-2xl" aria-hidden="true">
        🔍
      </span>
    </div>
  );
}
