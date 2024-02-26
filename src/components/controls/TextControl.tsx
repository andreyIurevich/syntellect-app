import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';
import TextControlViewModel from '../../viewmodels/TextControlViewModel';
import { CONTENT_TYPE } from '../../utils/constants';

// import UI-components
import TextAreaCtrl from '../ui/TextAreaCtrl';
import Button from '../ui/Button';

type TextAreaCtrlProps = {
  viewModel: TextControlViewModel
}

export default observer(({viewModel} : TextAreaCtrlProps) => {
  const [text, setText] = useState<string>('');
  function onInputChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function printHelloWorld() {
    setText('Hello World!')
  }

  function clear() {
    setText('');
  }

  function displayText() {
    alert(text);
  }

  function checkTextValue() {
    if (Number(text)) {
      alert(text);
    }
  }

  const printTextBtn = <Button key={nanoid()} value="Печать текста" callback={displayText} />;
  const checkTextBtn = <Button key={nanoid()} value="Проверка" callback={checkTextValue} />;
  const printHelloWorldBtn = <Button key={nanoid()} value="Текст" callback={printHelloWorld} />;
  const clearBtn = <Button key={nanoid()} value="Отчистить" callback={clear} />;

  return (
    <div>
      {
        viewModel.contentType === CONTENT_TYPE.LEFT ?
          <TextAreaCtrl
            rightSide={[clearBtn, printHelloWorldBtn]}
            value={text}
            onChange={onInputChanged}
          /> :
          <TextAreaCtrl
            leftSide={[checkTextBtn]}
            rightSide={[printTextBtn]}
            value={text}
            onChange={onInputChanged}
          />
      }
    </div>
  );
});