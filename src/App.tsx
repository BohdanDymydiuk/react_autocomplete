import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete } from './components/Autocomplete';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Person } from './types/Person';

export const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { name, born, died } = selectedPerson || {};
  const [delay] = useState(300);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const timerId = useRef(0);

  function saveQuery(newQuery: string) {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setQuery(newQuery.trim());
    }, delay);
  }

  const filteredPeople = useMemo(() => {
    return peopleFromServer.filter(person => person.name.includes(query));
  }, [query]);

  useEffect(() => {
    setFocus(false);
  }, [selectedPerson]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedPerson
            ? `${name} (${born} - ${died})`
            : 'No selected person'}
        </h1>

        <Autocomplete
          people={filteredPeople}
          saveQuery={saveQuery}
          setSelectedPerson={setSelectedPerson}
          setFocus={setFocus}
          focus={focus}
        />

        {filteredPeople.length === 0 && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
