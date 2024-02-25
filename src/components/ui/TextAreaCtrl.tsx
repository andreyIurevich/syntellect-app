import React, { ChangeEvent } from 'react';
import '../../styles/textAreaCtrl.css';

type TextAreaProps = {
  rightSide?: Array<React.ReactElement<{
    className?: string;
  }>>,
  leftSide?: Array<React.ReactElement<{
    className?: string;
  }>>,
  value: string,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
};

const TextAreaCtrl = (props: TextAreaProps) => {
  return (
    <div className="ctrl-container">
      {props.leftSide && (
        <div className="btn-side-container-left">
          {props.leftSide.map(item => item)}
        </div>
      )}
      <textarea className="textarea-ctrl" rows={7} value={props.value} onChange={props.onChange} />
      {props.rightSide && (
        <div className="btn-side-container-right">
          {props.rightSide.map(item => item)}
        </div>
      )}
    </div>
  );
};

export default TextAreaCtrl;
