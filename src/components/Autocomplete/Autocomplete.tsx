import React, { useState } from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  people: Person[];
  saveQuery: (query: string) => void;
  setSelectedPerson: (person: Person | null) => void;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  focus: boolean;
}

export const Autocomplete: React.FC<Props> = React.memo(
  ({ people, saveQuery, setSelectedPerson, setFocus, focus }) => {
    const [query, setQuery] = useState('');

    return (
      <div
        className={classNames('dropdown', { 'is-active': focus })}
        onFocus={() => setTimeout(() => setFocus(true), 100)}
      >
        <div className="dropdown-trigger">
          <input
            type="text"
            placeholder="Enter a part of the name"
            className="input"
            data-cy="search-input"
            onChange={event => {
              const value = event.target.value;

              setQuery(value);
              saveQuery(value);
              setSelectedPerson(null);
            }}
            value={query}
          />
        </div>

        <div
          className="dropdown-menu"
          role="menu"
          data-cy="suggestions-list"
          style={
            people.length === 0 || !focus
              ? { visibility: 'hidden' }
              : { visibility: 'visible' }
          }
        >
          <div className="dropdown-content">
            {people.map((person, index) => {
              const { name } = person;

              return (
                <div
                  className="dropdown-item"
                  data-cy="suggestion-item"
                  key={`person-${index}`}
                  onClick={() => {
                    setQuery(name);
                    saveQuery(name);
                    setSelectedPerson(person);
                  }}
                >
                  <p className="has-text-link">{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';
