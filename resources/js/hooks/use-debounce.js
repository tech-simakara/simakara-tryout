import { useRef } from 'react';

const useDebounce = (value = '', setValue, delay = 500, onChange) => {
	const timeoutRef = useRef(null);

	const handleSearch = (e) => {
		const newValue = e.target?.value;

		setValue(newValue);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			onChange(newValue);
		}, delay);
	};

	return { value, handleSearch };
};

export default useDebounce;
