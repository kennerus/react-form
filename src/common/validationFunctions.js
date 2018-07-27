import React from 'react';

export const errorClass = error => {
  return (error === ('') ? '' : error === ('valid') ? 'element__input_done' : 'element__input_error');
};