import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getPostById, getAuthUser, getIsPostPendingVote } from '../../reducers';
import { votePost } from '../actions';
import SinglePost from '../components/SinglePost';

class SinglePostContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    author: PropTypes.string,
  };

  static defaultProps = {
    author: null,
  };

  handleUserNavigate = () => {
    const { author } = this.props;
    this.props.navigation.navigate('User', { name: author });
  };

  handleTagNavigate = tag => {
    this.props.navigation.navigate('Tag', { tag });
  };

  render() {
    return (
      <SinglePost
        {...this.props}
        onUserNavigate={this.handleUserNavigate}
        onTagNavigate={this.handleTagNavigate}
      />
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const pendingVote = getIsPostPendingVote(state, id);
  const user = getAuthUser(state);
  const { metadata, upvoters } = post;

  const image = _.get(metadata, 'image[0]', null);

  const upvoted = user && user.name && upvoters.indexOf(user.name) !== -1;

  return { ...post, image, upvoted, pendingVote };
};

export default connect(mapStateToProps, { votePost })(withNavigation(SinglePostContainer));
