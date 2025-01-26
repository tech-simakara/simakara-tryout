import { useMemo, useState } from 'react';

const useDebouncedSearch = (initialValue = '', delay = 300, onSearch) => {
	const [value, setValue] = useState(initialValue);

	const debounce = (fn, delay) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	};

	const debouncedSearch = useMemo(() => debounce(onSearch, delay), [onSearch, delay]);

	const handleSearchChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
		debouncedSearch(newValue);
	};

	return { value, handleSearchChange };
};

export default useDebouncedSearch;
