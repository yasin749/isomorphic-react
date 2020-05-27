import React, {PureComponent} from 'react';
import cx from 'classnames';

import s from './Image.scss';

class Image extends PureComponent {
    render() {
        const {
            className,
            ...other
        } = this.props;

        return (
            <img
                className={cx(s.root, className)}
                {...other}/>
        );
    }
}

export default Image;
