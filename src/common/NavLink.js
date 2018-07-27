import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
  render() {
    let isActive = this.context.router.route.location.pathname === this.props.to;

    let activeClass = () => {
      if (isActive) {
        return 'navigation__link_current';
      } else {
         return '';
      }
    };

    return(
      <Link className={`navigation__link ${activeClass()}`} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object
};

export default NavLink;