import { useContext, createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

export interface FilterSettings {
  gender?: string | null,
  image_id?: string | null,
  min_age?: number | null,
  max_age?: number | null,
  min_price?: number | null,
  max_price?: number | null,
  type?: string | null
  size_group?: string | null,
}

export interface FilterContextType {
  filters: FilterSettings;
  // setFilters: (newFilters: FilterSettings) => void;
  setFilters: Dispatch<SetStateAction<FilterSettings>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("Error In Filter Context");
  return ctx;
}
