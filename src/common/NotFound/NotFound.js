import React from 'react';
import {Link} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite/no-important';

import bike from './img/bicycle.svg';

const NotFound = () => {
  return (
    <main className="main main_not-found">
        <h1>Страница не найдена :(</h1>

        <Link className={css(styles.link)} to="/form">
          <span className={css(styles.text)}>Вернуться к форме соискателя</span>
          <img
            className={css(styles.img)}
            src={bike}
            alt=">"
          />
        </Link>
    </main>
  );
};

const styles = StyleSheet.create({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    ':hover': {
      textDecoration: 'none'
    }
  },
  text: {
    marginRight: '15px',
    fontSize: '22px',
    color: '#3F51B5',
    ':hover': {
      color: '#5C6BC0',
    }
  },
  img: {
    width: '40px',
  }
});
export default NotFound;
