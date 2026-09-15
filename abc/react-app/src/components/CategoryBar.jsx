import React from 'react';
import { Link } from 'react-router-dom';

export const CATEGORIES = [
  "All Products",
  "Tiles",
  "Floor Tiles",
  "Wall Tiles",
  "Elevation Tiles",
  "Bath Room Tiles",
  "Kitchen Tiles",
  "Glazed Vitrified",
  "Polished Vitrified",
  "Outdoor Pavers",
  "Sanitarywares",
  "Fittings",
  "Granites"
];

const CategoryBar = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full bg-stone-100 border-b border-stone-200 overflow-hidden hidden md:block">
      <div className="max-w-[1400px] mx-auto px-2 flex items-center justify-center h-12">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory && activeCategory.toLowerCase() === category.toLowerCase();
          return (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(category);
                }
              }}
              className={`px-3 lg:px-4 h-full flex items-center justify-center font-headline-sm text-[12px] lg:text-[13px] font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#800000] text-white font-semibold'
                  : 'text-on-surface hover:bg-stone-200'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
