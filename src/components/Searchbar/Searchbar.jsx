import React, { useState } from 'react';
import { MdImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';

export default function Searchbar({ onClick }) {
  const [value, setValue] = useState('');

  function findPhoto(event) {
    event.preventDefault();
    if (value === '') {
      return;
    }

    onClick(value);
    setValue('');
  }

  function onChange(event) {
    setValue(event.target.value);
  }

  return (
    <Header>
      <Form onSubmit={findPhoto}>
        <Button type="submit">
          <MdImageSearch size={30} />
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={value}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};
