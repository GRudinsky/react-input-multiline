import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MultilineInput } from '../.';

const App = () => {
  return (
    <div>
      <MultilineInput
        id="multinineInput"
        value="some value"
        onChange={(e: { target: { value: string } }) =>
          console.log(e.target.value)
        }
        preventLineBreaks
        placeholder="type something here..."
        style={{ border: '1px solid black', backgroundColor: 'yellow' }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
