import { useState } from "react";

import { FilterContext, FilterSettings } from "./context";

const defaultFilters: FilterSettings = {
  gender: null,
  image_id: null,
  min_age: null,
  max_age: null,
  min_price: null,
  max_price: null,
  size_group: null,
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterSettings>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export default AppProvider;
