import React, { useRef, useState } from 'react';
import './MultilineInput.css';

type Props = {
  id: string,
  onChange: Function;
  value: string,
  placeholder?: string
  additionalClasses?: string[],
  disabled?: Boolean
  preventLineBreaks?: Boolean
}

export const MultilineInput = (props: Props) => {
  const {
    id,
    additionalClasses,
    placeholder,
    onChange,
    value,
    disabled = false,
    preventLineBreaks
  } = props;

  const defaultValue = useRef(value),
    [titleValue, setTitleValue] = useState(value),
    divRef = useRef<HTMLDivElement | null>(null),
    initialClasses = ['multilineInput'],
    classes = titleValue.length === 0 ? [...initialClasses, 'inlineBlock'] : initialClasses;

  additionalClasses && classes.push.apply(classes, additionalClasses);

  const setTargetPropsAndCallOnChange = (e: any): void => {
    const textValue = e.target.innerText.replace(/[\u200B]/g, '');
    setTitleValue(textValue)
    e.target.value = textValue;
    e.target.name = e.target.id;
    onChange(e);
  };

  const preventLineBreaksOnType = (e: React.KeyboardEvent<HTMLInputElement>): void | boolean => e.key.toLowerCase() === 'enter' && e.preventDefault();

  const preventLineBreaksOnPaste = (e: React.ClipboardEvent<HTMLInputElement>): void | boolean => {
    e.preventDefault();

    let clipboardText = e.clipboardData.getData('text');
    clipboardText = clipboardText.replace(/\n/g, ' ');

    const selection: any = window.getSelection();
    if (!selection.rangeCount) return false;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(clipboardText))
    selection.collapseToEnd();

    setTargetPropsAndCallOnChange(e);
  };

  return (
    <div
      title={titleValue}
      ref={divRef}
      id={id}
      className={classes.join(' ')}
      placeholder={placeholder}
      contentEditable={!disabled}
      onInput={setTargetPropsAndCallOnChange}
      onBlur={setTargetPropsAndCallOnChange}
      onKeyDown={preventLineBreaks && preventLineBreaksOnType}
      onPaste={preventLineBreaks && preventLineBreaksOnPaste}
      spellCheck={false}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
    />
  );
};
