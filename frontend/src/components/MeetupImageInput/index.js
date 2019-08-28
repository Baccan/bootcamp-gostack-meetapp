import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function MeetupImageInput() {
  const { defaultValue, registerField } = useField('file_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.path);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    console.tron.log(response);

    const { id, path } = response.data;

    console.tron.log(path);

    setFile(id);
    setPreview(path);
  }

  return (
    <Container>
      <label htmlFor="image">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />
        Selecionar imagem
        <input
          type="file"
          id="image"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
