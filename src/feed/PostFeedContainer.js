import { connect } from 'react-redux';
import _ from 'lodash';
import { getPostById, getAuthUser } from '../reducers';
import PostFeed from '../components/PostFeed';

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const user = getAuthUser(state);
  const { author, title, created, upvoteCount, commentCount, metadata, payout, upvoters } = post;

  const image = _.get(metadata, 'image[0]', null);

  const upvoted = user && user.name && upvoters.indexOf(user.name) !== -1;

  return { id, author, title, created, upvoteCount, commentCount, image, payout, upvoted };
};

export default connect(mapStateToProps)(PostFeed);
