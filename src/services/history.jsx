import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';

const history = createBrowserHistory({ window });

export default function CustomRouter({ children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HistoryRouter history={history} {...props}>
      {children}
    </HistoryRouter>
  );
}

export const rootNavigate = (to) => {
  history.push(to);
};

CustomRouter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
