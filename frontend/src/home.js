import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

class Home extends Component {

  render() {
    const { t } = this.props;
    return(
    <div>
      <div className="py-5 text-center">
        <h2>{t('home')}</h2>
      </div>

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2020 CPSC 2650</p>
      </footer>
    </div>
    );
  }
}

export default withTranslation()(Home);
