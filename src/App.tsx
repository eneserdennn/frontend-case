import Select from "./components/Select";
import { searchCharacters } from "@/services/RickAndMortyService";
import { Character } from "@/types/RickAndMortyType";
import { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      searchCharacters(query)
        .then((data) => {
          setResults(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setNotFound(true);
          }
          console.error("There is an error fetching data from API");
          setIsLoading(false);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <Select
      options={results}
      value={query}
      onChange={setQuery}
      selectedCharacters={selectedCharacters}
      setSelectedCharacters={setSelectedCharacters}
      isLoading={isLoading}
      notFound={notFound}
    />
  );
};

export default App;
