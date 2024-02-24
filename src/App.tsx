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
      <TextControl viewModel={textAreaCtrlViewModelLeftRight} />
      <TextControl viewModel={textAreaCtrlViewModelLeft} />
      <AutoComplete viewModel={autoComplete} />
    </main>
  );
}

export default App;
