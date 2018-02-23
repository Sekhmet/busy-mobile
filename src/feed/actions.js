import createAsyncType from '../helpers/createAsyncType';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');
export const REFRESH_FEED = createAsyncType('@feed/REFRESH_FEED');

export const getFeed = (sortBy, tag) => ({ type: GET_FEED.REQUEST, meta: { sortBy, tag } });
export const getMoreFeed = (sortBy, tag) => ({
  type: GET_MORE_FEED.REQUEST,
  meta: { sortBy, tag },
});
export const refreshFeed = (sortBy, tag) => ({ type: REFRESH_FEED.REQUEST, meta: { sortBy, tag } });
