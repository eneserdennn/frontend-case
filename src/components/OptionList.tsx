import styles from "@/styles/select.module.css";
import { Character } from "@/types/RickAndMortyType";
import { useRef, useEffect } from "react";

type OptionsListProps = {
  options: Character[];
  selectedCharacters: Character[];
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  handleSelect: (option: Character) => void;
  value: string;
};

const OptionsList = ({
  options,
  selectedCharacters,
  focusedIndex,
  setFocusedIndex,
  handleSelect,
  value,
}: OptionsListProps) => {
  const optionsContainerRef = useRef<HTMLUListElement>(null);

  const highlightMatch = (name: string, query: string) => {
    if (!query) return name;

    const matchStart = name.toLowerCase().indexOf(query.toLowerCase());
    if (matchStart === -1) return name;

    const matchEnd = matchStart + query.length;
    return (
      <>
        {name.substring(0, matchStart)}
        <strong>{name.substring(matchStart, matchEnd)}</strong>
        {name.substring(matchEnd)}
      </>
    );
  };

  useEffect(() => {
    if (focusedIndex >= 0 && optionsContainerRef.current) {
      const optionElement = document.querySelector(
        `#option-${focusedIndex}`
      ) as HTMLElement | null;
      const optionsContainer = optionsContainerRef.current;

      if (optionElement) {
        const optionTop = optionElement.offsetTop;
        const optionBottom = optionTop + optionElement.offsetHeight;
        const containerTop = optionsContainer.scrollTop;
        const containerBottom = containerTop + optionsContainer.offsetHeight;

        if (optionTop < containerTop) {
          optionsContainer.scrollTop = optionTop;
        } else if (optionBottom > containerBottom) {
          optionsContainer.scrollTop =
            optionBottom - optionsContainer.offsetHeight;
        }
      }
    }
  }, [focusedIndex]);

  return (
    <div className={styles.optionsContainer}>
      <ul ref={optionsContainerRef} className={styles.options}>
        {options.map((option, index) => (
          <li
            key={option.id}
            id={`option-${index}`}
            onMouseOver={() => setFocusedIndex(index)}
            className={`${styles.option} ${
              index === focusedIndex ? styles.highlighted : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            <input
              type="checkbox"
              checked={selectedCharacters.some((c) => c.id === option.id)}
              readOnly
            />
            <img
              className={styles.image}
              src={option.image}
              alt={option.name}
            />
            <div className={styles.info}>
              <span className={styles.name}>
                {highlightMatch(option.name, value)}
              </span>
              <span className={styles.episodes}>
                {option.episode.length + " Episodes"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsList;
