import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Image from '../../../partials/image/Image'

import s from './BlogBox.scss';

class BlogBox extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    className: PropTypes.string,
    blog: PropTypes.object,
  };

  render() {
    const {
      index,
      className,
      blog,
    } = this.props;


    return (
      <div
        className={cx(s.root, className)}>
        <div className={s.inner}>
          <Image
            className={s.image}
            src={`https://loremflickr.com/64${index.toString().split('').
              reverse()[0]}/360`}/>
          <div className={s.content}>
            <div className={s.title}>
              {blog.title}
            </div>
            <div className={s.description}>
              {blog.body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogBox;
