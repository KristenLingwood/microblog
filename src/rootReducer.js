const INITIAL_STATE = {
  posts: []
};

function rootReducer(state = INITIAL_STATE, action) {
  if (action.type === 'FETCH_POSTS') {
    return {
      ...state,
      posts: action.posts
    };
  }
  if (action.type === 'ADD_POST') {
    return {
      ...state,
      posts: [
        ...state.posts,
        { id: action.id, title: action.title, body: action.body, comments: [] }
      ]
    };
  }
  if (action.type === 'DELETE_POST') {
    return { ...state, posts: state.posts.filter(p => p.id !== action.id) };
  }
  if (action.type === 'UPDATE_POST') {
    return {
      ...state,
      posts: state.posts.map(p => {
        if (p.id === action.id) {
          p.id = action.id;
          p.title = action.title;
          p.body = action.body;
          return p;
        }
        return p;
      })
    };
  }
  if (action.type === 'ADD_COMMENT') {
    const newComment = { id: action.id, text: action.text };
    const posts = state.posts.map(p => {
      if (p.id === action.id) {
        return (p.comments = [...p.comments, newComment]);
      }
      return p;
    });
  }
  if (action.type === 'DELETE_COMMENT') {
    return {
      ...state,
      posts: state.posts.map(p => {
        if (p.id === action.post_id) {
          p.comments = p.comments.filter(c => {
            return c.id !== action.comment_id;
          });
        }
        return p;
      })
    };
  }
  return { ...state };
}

export default rootReducer;
