import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
  render() {
    let isActive = this.context.router.route.location.pathname === this.props.to;
    let isIndex = this.context.router.route.location.pathname === "/";

    let activeClass = () => {
      if (isActive) {
        return 'navigation__link_current';
      } else {
         return '';
      }
    };

    let defaultlink = '';

    if(this.props.defaultlink !== undefined && isIndex){
      defaultlink = this.props.defaultlink;
    }

    return(
      <Link className={`navigation__link ${activeClass()} ${defaultlink}`} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
  defaultlink: PropTypes.string
};

export default NavLink;