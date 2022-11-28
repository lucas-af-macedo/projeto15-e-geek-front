import { createContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
	const [searchInfo, setSearchInfo] = useState({ tags: [] });

	return <SearchContext.Provider value={{ searchInfo, setSearchInfo }}>{children}</SearchContext.Provider>;
}

export default SearchContext;
