import { useProductStore } from '../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import type { IProductItem } from '../interface';
import { PAGINATION_SIZE } from '../constant';

const renderPricing = (item: IProductItem): string => {
  if (item.pricing === 'paid') return item.price.toFixed(2);
  if (item.pricing === 'free') return 'FREE';
  return 'VIEW ONLY';
};

interface IProductCardProps {
  item: IProductItem;
}

const ProductCard: React.FC<IProductCardProps> = ({ item }): React.ReactElement => {
  return (
    <div className="relative flex min-h-[320px] flex-col justify-end rounded-lg bg-secondary p-4">
      <div className="mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-secondary">
        {item.photoUrl ? (
          <img src={item.photoUrl} alt={item.title} className="h-full w-full object-contain" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-gray-400">
        <div>
          <p className="mb-1 truncate text-sm font-semibold">{item.title}</p>
          <p className="mb-2 truncate text-xs">{item.userName}</p>
        </div>
        <div className="flex items-center gap-2 text-lg font-bold text-white">
          {renderPricing(item)}
        </div>
      </div>
    </div>
  );
};

export default function ProductItems() {
  const { filteredItems: filteredContents } = useProductStore();
  const [visibleCount, setVisibleCount] = useState(PAGINATION_SIZE);

  useEffect(() => {
    setVisibleCount(PAGINATION_SIZE);
  }, [filteredContents]);

  const hasMore = visibleCount < filteredContents.length;
  const itemsToShow = filteredContents.slice(0, visibleCount);

  const fetchMoreData = () => {
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGINATION_SIZE, filteredContents.length));
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={itemsToShow.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div className="py-4 text-center text-gray-400">Loading more...</div>}
      scrollThreshold={0.95}
      style={{ overflow: 'visible' }}
    >
      <div className="grid grid-cols-1 gap-6 bg-secondary sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {itemsToShow.length === 0 ? (
          <div className="col-span-full flex flex-col items-center gap-2 py-12 text-center text-gray-400">
            <span>No content found.</span>
          </div>
        ) : (
          itemsToShow.map((item) => <ProductCard key={item.id} item={item} />)
        )}
      </div>
    </InfiniteScroll>
  );
}
