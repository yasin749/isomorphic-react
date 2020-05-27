import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BlogBox from '../BlogBox';

import s from './BlogBoxList.scss';

class BlogBoxList extends PureComponent {
  static propTypes = {
    blogs: PropTypes.array,
  };

  render() {
    const {
      blogs,
    } = this.props;

    if (!blogs) {
      return null;
    }

    return (
      <div className={cx(s.root, 'row')}>
        {
          blogs.map((blog, index) => (
            <BlogBox
              key={index}
              index={index}
              className={cx(s.blogBox, 'col-4 col-xs-12')}
              blog={blog}/>
          ))
        }
      </div>
    );
  }
}

export default BlogBoxList;
