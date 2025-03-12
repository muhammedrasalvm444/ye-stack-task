import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { useInView } from "react-intersection-observer";

const SearchInput = ({
  placeholder = "Search...",
  query,
  setQuery,
  data = [],
  isLoading,
  isError,
  onSelect,
  allowMultiple = false,
  itemKey = "id",
  renderItem = (item) => <span>{item.title}</span>,
  loadMore,
}) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });
  const debouncedQuery = useDebounce(query, 300); // Debounce input for better performance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // Stores selected items
  const searchRef = useRef(null); // Ref to detect outside clicks
  const [activeIndex, setActiveIndex] = useState(-1); // Default to -1 (no selection)

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return data; // Show first 15 items when no search input
    return data.filter((item) =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, data]);

  // Handle input focus to open dropdown
  const handleFocus = () => setIsDropdownOpen(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update query state
  };

  // Handle item selection
  const handleSelect = useCallback(
    (item) => {
      setSelectedItems((prev) => {
        if (prev.some((selected) => selected[itemKey] === item[itemKey]))
          return prev;
        const updatedItems = allowMultiple ? [...prev, item] : [item];
        onSelect(updatedItems);
        return updatedItems;
      });
    },
    [onSelect, allowMultiple, itemKey]
  );

  // Remove selected item
  const handleRemove = (itemToRemove) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter(
        (item) => item[itemKey] !== itemToRemove[itemKey]
      );
      onSelect(updatedItems); // Notify parent component after removal
      return updatedItems;
    });
  };

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    if (!isDropdownOpen || filteredData.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        setActiveIndex((prev) =>
          prev < filteredData.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        event.preventDefault(); // Prevent form submission if inside a form
        const selectedItem = filteredData[activeIndex];

        if (selectedItem) {
          handleSelect(selectedItem);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (inView && loadMore) {
      loadMore();
    }
  }, [inView]);

  return (
    <SearchContainer ref={searchRef}>
      {/* Search input field */}
      <SelectedItemsContainer>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          onKeyDown={handleKeyDown}
        />
      </SelectedItemsContainer>

      {/* Dropdown list */}
      {isDropdownOpen && (
        <Dropdown id="autocomplete-list" role="listbox">
          {isError ? (
            <NoResults>Error fetching data</NoResults>
          ) : (
            <>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const isSelected = selectedItems.some(
                    (selected) => selected[itemKey] === item[itemKey]
                  );

                  return (
                    <DropdownItem
                      key={`${item[itemKey]}-${index}`} // Ensures uniqueness
                      onClick={() => !isSelected && handleSelect(item)}
                      role="option"
                      disabled={isSelected}
                      className={isSelected ? "disabled" : ""}
                      ref={index === filteredData.length - 4 ? ref : null}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {renderItem(item)}
                    </DropdownItem>
                  );
                })
              ) : (
                <>{!isLoading && <NoResults>No results found</NoResults>}</>
              )}
              {isLoading && <LoadingSpinner />}
            </>
          )}
        </Dropdown>
      )}

      {/* Selected items display */}
      <SelectedList>
        {selectedItems.map((item) => (
          <SelectedItem key={item[itemKey]}>
            {item.title.length > 10
              ? `${item.title.substring(0, 5)}..`
              : item.title}
            <RemoveButton onClick={() => handleRemove(item)}>×</RemoveButton>
          </SelectedItem>
        ))}
      </SelectedList>
    </SearchContainer>
  );
};

export default SearchInput;

/* Styled Components */
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 400px;
  margin: 0 auto;
`;

const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px;
  min-height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  position: relative;
`;

const SelectedList = styled.div`
  display: flex;
  gap: 0.3rem;
  overflow-x: scroll;
  max-width: 380px;
  min-width: 350px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  ms-overflow-style: none;
  margin-top: 4px;
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  background: #555;
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  margin: 2px;
  font-size: 14px;
  max-width: 6rem;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 2px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  background: transparent;
  width: 20rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  height: 250px;
  width: 100%;
  background: white;
  border: 1px solid #999;
  border-radius: 5px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  color: #585858;
  border-bottom: 1px solid #999;
  border-radius: 2px;

  &:hover {
    background: #f0f0f0;
  }
  &.disabled {
    color: gray;
    pointer-events: none;
    opacity: 0.6;
  }
`;

const NoResults = styled.p`
  padding: 12px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  &::after {
    content: "";
    width: 24px;
    height: 24px;
    border: 4px solid gray;
    border-top-color: blue;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
