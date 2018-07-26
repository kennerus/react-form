import React from 'react';
import NavLink from './NavLink';

const Navigation = () => {

  return (
    <nav className="navigation">
      <NavLink defaultlink="js_defaultLink" to="/form">Анкета соискателя</NavLink>
      <NavLink to="/request">Регистрация на конференцию</NavLink>
    </nav>
  );
};

export default Navigation;
