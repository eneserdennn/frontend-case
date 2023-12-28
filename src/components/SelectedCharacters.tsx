import styles from "@/styles/select.module.css";
import { Character } from "@/types/RickAndMortyType";

export type SelectedCharacterProps = {
  selectedCharacters: Character[];
  setSelectedCharacters: (characters: Character[]) => void;
  value: string;
  onChange: (value: string) => void;
};

const SelectedCharacters = ({
  selectedCharacters,
  setSelectedCharacters,
  value,
  onChange,
}: SelectedCharacterProps) => {
  return (
    <>
      {selectedCharacters.map((character) => (
        <div key={character.id} className={styles.selectedCharacter}>
          {character.name}
          <button
            className={styles.removeButton}
            onClick={() =>
              setSelectedCharacters(
                selectedCharacters.filter((c) => c.id !== character.id)
              )
            }
          >
            &times;
          </button>
        </div>
      ))}
      <div className={styles.inputContainer}>
        <input
          className={styles.value}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className={styles.caret}></div>
      </div>
    </>
  );
};

export default SelectedCharacters;
