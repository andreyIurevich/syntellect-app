import React from "react";
import TextControlViewModel from './viewmodels/TextControlViewModel';
import AutoCompleteViewModel from './viewmodels/AutoCompleteViewModel';
import AutoComplete from "./components/AutoComplete";
import TextControl from "./components/TextControl";
import { CONTENT_TYPE } from './utils/constants';
import "./App.css";

function App() {
  const textAreaCtrlViewModelLeft = new TextControlViewModel(CONTENT_TYPE.LEFT);
  const textAreaCtrlViewModelLeftRight = new TextControlViewModel(CONTENT_TYPE.BOTH);
  const autoComplete = new AutoCompleteViewModel(10);

  return (
    <main>
      <section className="app-section">
        <h3>Контрол с 1 кнопкой справа и 1 кнопкой слева</h3>
        <TextControl viewModel={textAreaCtrlViewModelLeftRight} />
      </section>
      <section className="app-section">
        <h3>Контрол с 2 кнопками справа</h3>
        <TextControl viewModel={textAreaCtrlViewModelLeft} />
      </section>
      <section className="app-section">
        <h3>Контрол-автокомплит</h3>
        <AutoComplete viewModel={autoComplete} />
      </section>
    </main>
  );
}

export default App;
