import styles from "@/styles/select.module.css";
import { Character } from "@/types/RickAndMortyType";
import { useState } from "react";
import SelectedCharacters from "./SelectedCharacters";
import OptionsList from "./OptionList";

type SelectProps = {
  options: Character[];
  value: string;
  onChange: (value: string) => void;
  selectedCharacters: Character[];
  setSelectedCharacters: (characters: Character[]) => void;
  isLoading?: boolean;
  notFound?: boolean;
};

const Select = ({
  value,
  onChange,
  options,
  selectedCharacters,
  setSelectedCharacters,
  isLoading,
  notFound,
}: SelectProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleSelect = (option: Character) => {
    if (selectedCharacters.some((c) => c.id === option.id)) {
      setSelectedCharacters(
        selectedCharacters.filter((c) => c.id !== option.id)
      );
    } else {
      setSelectedCharacters([...selectedCharacters, option]);
    }
    onChange("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, options.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      handleSelect(options[focusedIndex]);
    } else if (event.key === "Escape") {
      setFocusedIndex(-1);
      onChange("");
    }
  };

  return (
    <div tabIndex={0} className={styles.container} onKeyDown={handleKeyDown}>
      <SelectedCharacters
        selectedCharacters={selectedCharacters}
        setSelectedCharacters={setSelectedCharacters}
        value={value}
        onChange={onChange}
      />

      {isLoading && <div className={styles.loading}>Loading...</div>}
      {notFound && <div className={styles.noResults}>No results found</div>}
      {options.length > 0 && (
        <OptionsList
          focusedIndex={focusedIndex}
          options={options}
          selectedCharacters={selectedCharacters}
          setFocusedIndex={setFocusedIndex}
          handleSelect={handleSelect}
          value={value}
        />
      )}
    </div>
  );
};

export default Select;
