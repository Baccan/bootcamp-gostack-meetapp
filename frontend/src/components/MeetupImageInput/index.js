import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function MeetupImageInput() {
  const { defaultValue, registerField } = useField('image');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

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

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="file_id">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />
        Selecionar imagem
        <input
          type="file"
          id="file_id"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
