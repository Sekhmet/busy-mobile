import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CrossTouchable from '../../components/CrossTouchable';
import Container from '../../components/Container';
import Header from '../../components/Post/Header';
import ImagePreview from '../../components/Post/ImagePreview';
import Title from '../../components/Post/Title';
import Body from '../../components/Post/Body';
import Footer from '../../components/Post/Footer';

export default class PostFeed extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    excerpt: PropTypes.string,
    upvoteCount: PropTypes.number,
    commentCount: PropTypes.number,
    payout: PropTypes.number,
    upvoted: PropTypes.bool,
    pendingVote: PropTypes.bool,
    image: PropTypes.string,
    votePost: PropTypes.func,
    onPostNavigate: PropTypes.func,
    onUserNavigate: PropTypes.func,
    onCommentsNavigate: PropTypes.func,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    excerpt: '',
    upvoteCount: 0,
    commentCount: 0,
    payout: 0,
    upvoted: false,
    pendingVote: false,
    image: null,
    votePost: () => {},
    onPostNavigate: () => {},
    onUserNavigate: () => {},
    onCommentsNavigate: () => {},
  };

  handleLikeClick = () => {
    const { id, pendingVote, upvoted } = this.props;

    if (pendingVote) return;

    const weight = upvoted ? 0 : 10000;
    this.props.votePost(id, weight);
  };

  handleUserPress = () => {
    const { author } = this.props;
    this.props.onUserNavigate(author);
  };

  handlePostPress = () => {
    const { id } = this.props;
    this.props.onPostNavigate(id);
  };

  handleCommentsClick = () => {
    const { id } = this.props;
    this.props.onCommentsNavigate(id);
  };

  render() {
    const {
      author,
      title,
      created,
      excerpt,
      upvoteCount,
      commentCount,
      image,
      payout,
      upvoted,
      pendingVote,
    } = this.props;

    return (
      <Container>
        <Header author={author} created={created} onPress={this.handleUserPress} />
        <CrossTouchable onPress={this.handlePostPress}>
          <View>
            {image && (
              <ImagePreview source={{ uri: `https://steemitimages.com/400x400/${image}` }} />
            )}
            <Title narrow={!image} numberOfLines={3}>
              {title}
            </Title>
            <Body numberOfLines={3}>{excerpt}</Body>
            <Footer
              upvoted={upvoted}
              pendingVote={pendingVote}
              upvoteCount={upvoteCount}
              commentCount={commentCount}
              payout={payout}
              onLikeClick={this.handleLikeClick}
              onCommentsClick={this.handleCommentsClick}
            />
          </View>
        </CrossTouchable>
      </Container>
    );
  }
}
