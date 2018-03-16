import { combineReducers } from 'redux';
import { GET_COMMENTS } from './actions';

function postReplies(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS.SUCCESS:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case GET_COMMENTS.REQUEST:
      return true;
    case GET_COMMENTS.SUCCESS:
    case GET_COMMENTS.ERROR:
      return false;
    default:
      return state;
  }
}

function replies(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS.SUCCESS:
      return { ...state, [action.meta.postId]: postReplies(state[action.meta.postId], action) };
    default:
      return state;
  }
}

export default combineReducers({
  replies,
  loading,
});
export const getCommentsIdsByPostId = (state, id) => state.replies[id];
export const getIsCommentsLoading = state => state.loading;
