import React, { useState } from 'react';
import 'bulma/css/bulma.css';

const originalGoods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function App() {
  const [goods, setGoods] = useState([...originalGoods]);
  const [activeSort, setActiveSort] = useState(null); // 'alphabetically' | 'by-length' | 'reverse' | null

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setActiveSort('alphabetically');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveSort('by-length');
  };

  const reverseOrder = () => {
    setGoods([...goods].reverse());
    setActiveSort('reverse');
  };

  const resetOrder = () => {
    setGoods([...originalGoods]);
    setActiveSort(null);
  };

  return (
    <div className="container mt-5">
      <div className="buttons">
        <button
          data-cy="sort-alphabetically"
          className={`button ${activeSort === 'alphabetically' ? 'is-primary' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          data-cy="sort-by-length"
          className={`button ${activeSort === 'by-length' ? 'is-primary' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          data-cy="reverse"
          className={`button ${activeSort === 'reverse' ? 'is-primary' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {activeSort && (
          <button
            data-cy="reset"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <table className="table is-fullwidth is-striped mt-4">
        <tbody>
          {goods.map(item => (
            <li key={item}>{item}</li>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
