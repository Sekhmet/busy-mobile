import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth/reducer';
import comments, * as fromComments from './comments/reducer';
import feed, * as fromFeed from './feed/reducer';
import posts, * as fromPosts from './posts/reducer';
import users, * as fromUsers from './users/reducer';

export default combineReducers({
  auth,
  comments,
  feed,
  posts,
  users,
});

export const getIsAuthLoading = state => fromAuth.getIsAuthLoading(state.auth);
export const getAuthUser = state => fromAuth.getAuthUser(state.auth);

export const getCommentsIdsByPostId = (state, id) =>
  fromComments.getCommentsIdsByPostId(state.comments, id);
export const getIsCommentsLoading = (state, id) =>
  fromComments.getIsCommentsLoading(state.comments, id);
export const getIsCommentsLoaded = (state, id) =>
  fromComments.getIsCommentsLoaded(state.comments, id);

export const getFeedIds = (state, sortBy, tag) => fromFeed.getFeedIds(state.feed, sortBy, tag);
export const getFeedLoading = (state, sortBy, tag) =>
  fromFeed.getFeedLoading(state.feed, sortBy, tag);
export const getFeedRefreshing = (state, sortBy, tag) =>
  fromFeed.getFeedRefreshing(state.feed, sortBy, tag);
export const getLastPostId = (state, sortBy, tag) =>
  fromFeed.getLastPostId(state.feed, sortBy, tag);

export const getPostById = (state, id) => fromPosts.getPostById(state.posts, id);
export const getIsPostPendingVote = (state, id) => fromPosts.getIsPostPendingVote(state.posts, id);

export const getUsersLoading = state => fromUsers.getUsersLoading(state.users);
export const getUserPostCount = (state, name) => fromUsers.getUserPostCount(state.users, name);
export const getUserFollowerCount = (state, name) =>
  fromUsers.getUserFollowerCount(state.users, name);
export const getUserFollowingCount = (state, name) =>
  fromUsers.getUserFollowingCount(state.users, name);
export const getUserMetadata = (state, name) => fromUsers.getUserMetadata(state.users, name);
export const getUserDisplayName = (state, name) => fromUsers.getUserDisplayName(state.users, name);
export const getUserAbout = (state, name) => fromUsers.getUserAbout(state.users, name);
export const getUserCover = (state, name) => fromUsers.getUserCover(state.users, name);
