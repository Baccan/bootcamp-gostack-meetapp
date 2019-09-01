import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ value }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField('date');
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: 'date_hour',
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [ref.current, fieldName]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        value={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        placeholderText="Data do meetup"
        minDate={new Date()}
        timeIntervals={15}
        dateFormat="dd/MM/yyyy, HH:mm:ss"
        showTimeSelect
      />
      {error && <span>{error}</span>}
    </>
  );
}
