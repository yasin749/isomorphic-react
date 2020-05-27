import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import s from './MainLayout.scss';

class MainLayout extends Component {
    static propTypes = {
        className: PropTypes.string,
        location: PropTypes.object,
        children: PropTypes.any,
    };

    render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <div className={cx(s.root, className)}>
                <main>
                    <div className={'container'}>
                        {children}
                    </div>
                </main>
            </div>
        );
    }
}

export default MainLayout;
