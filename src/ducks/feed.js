import _ from 'lodash';
import createAsyncType from '../helpers/createAsyncType';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');
export const REFRESH_FEED = createAsyncType('@feed/REFRESH_FEED');

function getFeedName(sortBy, tag) {
  return tag ? `tag/${tag}/${sortBy}` : `global/${sortBy}`;
}

const initialFeedState = {
  loading: false,
  refreshing: false,
  list: [],
};

const initialState = {};

function feedList(state = initialFeedState.list, action) {
  switch (action.type) {
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return [...state, ...action.payload.map(post => post.id)];
    case REFRESH_FEED.SUCCESS:
      return action.payload.map(post => post.id);
    default:
      return state;
  }
}

function feed(state = initialFeedState, action) {
  switch (action.type) {
    case GET_FEED.REQUEST:
      return { ...state, loading: true, list: [] };
    case GET_MORE_FEED.REQUEST:
      return { ...state, loading: true };
    case REFRESH_FEED.REQUEST:
      return { ...state, refreshing: true };
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return {
        ...state,
        loading: false,
        list: feedList(state.list, action),
      };
    case REFRESH_FEED.SUCCESS:
      return {
        ...state,
        refreshing: false,
        list: feedList(state.list, action),
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED.REQUEST:
    case GET_MORE_FEED.REQUEST:
    case REFRESH_FEED.REQUEST:
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
    case REFRESH_FEED.SUCCESS: {
      const { sortBy, tag } = action.meta;
      const feedName = getFeedName(sortBy, tag);
      return {
        ...state,
        [feedName]: feed(state[feedName], action),
      };
    }
    default:
      return state;
  }
}

export const getFeedList = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).list;
export const getFeedLoading = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).loading;
export const getFeedRefreshing = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).refreshing;
export const getLastPostId = (state, sortBy, tag) => {
  const list = getFeedList(state, sortBy, tag);
  return list[list.length - 1];
};

export const getFeed = (sortBy, tag) => ({ type: GET_FEED.REQUEST, meta: { sortBy, tag } });
export const getMoreFeed = (sortBy, tag) => ({
  type: GET_MORE_FEED.REQUEST,
  meta: { sortBy, tag },
});
export const refreshFeed = (sortBy, tag) => ({ type: REFRESH_FEED.REQUEST, meta: { sortBy, tag } });
