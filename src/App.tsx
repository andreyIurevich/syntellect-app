import React from "react";
import TextControlViewModel from './viewmodels/TextControlViewModel';
import AutoCompleteViewModel from './viewmodels/AutoCompleteViewModel';
import AutoComplete from "./components/controls/AutoComplete";
import TextControl from "./components/controls/TextControl";
import { CONTENT_TYPE } from './utils/constants';
import "./App.css";

function App() {
  const textAreaCtrlViewModelLeft = new TextControlViewModel(CONTENT_TYPE.LEFT);
  const textAreaCtrlViewModelLeftRight = new TextControlViewModel(CONTENT_TYPE.BOTH);
  const autoCompleteMax10 = new AutoCompleteViewModel(10);
  const autoCompleteMax3 = new AutoCompleteViewModel(3);

  return (
    <main>
      <div className="app-content">
        <section className="app-section">
          <h3>Контрол с 1 кнопкой справа и 1 кнопкой слева</h3>
          <TextControl viewModel={textAreaCtrlViewModelLeftRight} />
        </section>
        <section className="app-section">
          <h3>Контрол с 2 кнопками справа</h3>
          <TextControl viewModel={textAreaCtrlViewModelLeft} />
        </section>
      </div>
      <div className="app-content">
        <section className="app-section">
          <h3>Контрол-автокомплит</h3>
          <AutoComplete viewModel={autoCompleteMax10} />
        </section>
        <section className="app-section">
          <h3>Контрол-автокомплит</h3>
          <AutoComplete viewModel={autoCompleteMax3} />
        </section>
      </div>
    </main>
  );
}

export default App;
