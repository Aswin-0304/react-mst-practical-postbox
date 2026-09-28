import React, { useState } from 'react';

/**
 * PostBox Component
 * Demonstrates React Controlled Components concept.
 * Manages post content state, live character count, validation rules, post submission,
 * saving submitted posts, and deleting saved posts.
 */
const PostBox = () => {
  // 1. Controlled Component State for current post content
  const [postContent, setPostContent] = useState('');
  
  // 2. Saved Posts State array
  const [savedPosts, setSavedPosts] = useState([]);

  const MAX_LIMIT = 100;

  // Derived values for live character count and validation
  const currentCount = postContent.length;
  const isOverLimit = currentCount > MAX_LIMIT;
  const isEmpty = currentCount === 0;

  // Button disabled condition: disabled if empty OR character count exceeds 100
  const isButtonDisabled = isEmpty || isOverLimit;

  /**
   * Input Change Handler
   * Updates state on every keystroke ensuring single source of truth.
   */
  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };

  /**
   * Form Submit / Post Action Handler
   * Saves current post, triggers alert, resets state, and resets character counter on successful post.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isButtonDisabled) {
      const newPost = {
        id: Date.now(),
        text: postContent,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      // Add new post to saved posts list (newest first)
      setSavedPosts([newPost, ...savedPosts]);

      alert('Post submitted successfully!');
      setPostContent(''); // Clears textarea and resets counter to 0
    }
  };

  /**
   * Delete Post Handler
   * Removes a saved post by its unique ID.
   */
  const handleDeletePost = (id) => {
    setSavedPosts(savedPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="post-box-wrapper">
      {/* Post Creation Card */}
      <div className="post-card" role="region" aria-label="Social Post Box Component">
        {/* Author / User Header */}
        <header className="card-header">
          <div className="user-avatar" aria-hidden="true">
            PB
          </div>
          <div className="user-info">
            <span className="user-name">Post Box</span>
            <span className="post-privacy">🌐 Public Post</span>
          </div>
        </header>

        {/* Controlled Post Form */}
        <form onSubmit={handleSubmit} className="post-form">
          <div className="textarea-wrapper">
            <label htmlFor="post-input" style={{ display: 'none' }}>
              Write your post content
            </label>
            <textarea
              id="post-input"
              className={`post-textarea ${isOverLimit ? 'limit-exceeded' : ''}`}
              placeholder="What's on your mind?"
              value={postContent}
              onChange={handleInputChange}
              aria-invalid={isOverLimit}
              aria-describedby={isOverLimit ? "warning-msg character-counter-msg" : "character-counter-msg"}
            />
          </div>

          {/* Immediate Red Warning Message when character limit exceeded */}
          {isOverLimit && (
            <div id="warning-msg" className="warning-banner" role="alert">
              <svg
                className="warning-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Limit exceeded</span>
            </div>
          )}

          {/* Footer Area: Visual Progress Bar Counter & Submit Button */}
          <footer className="post-footer">
            <div className="counter-progress-group">
              {/* Progress Percentage Square Box */}
              <div className={`progress-badge-box ${isOverLimit ? 'over-limit' : ''}`}>
                <span className="badge-text">{Math.round((currentCount / MAX_LIMIT) * 100)}%</span>
              </div>

              {/* Horizontal Progress Bar Track */}
              <div className="progress-track-wrapper">
                <div className="progress-track">
                  <div
                    className={`progress-fill ${isOverLimit ? 'over-limit' : ''}`}
                    style={{ width: `${Math.min((currentCount / MAX_LIMIT) * 100, 100)}%` }}
                  />
                </div>
                <div
                  id="character-counter-msg"
                  className={`character-counter-text ${isOverLimit ? 'over-limit' : ''}`}
                  aria-live="polite"
                >
                  {currentCount} / {MAX_LIMIT}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="post-submit-btn"
              disabled={isButtonDisabled}
              aria-disabled={isButtonDisabled}
            >
              Post
            </button>
          </footer>
        </form>
      </div>

      {/* Saved Posts Display Section */}
      <section className="saved-posts-container" aria-label="Saved Posts List">
        <div className="saved-posts-header">
          <h2 className="saved-posts-title">
            Saved Posts
          </h2>
          <span className="posts-badge">{savedPosts.length}</span>
        </div>

        {savedPosts.length === 0 ? (
          <div className="no-posts-card">
            <p className="no-posts-msg">No posts saved yet. Type a post above and click Post!</p>
          </div>
        ) : (
          <ul className="posts-list">
            {savedPosts.map((post) => (
              <li key={post.id} className="post-item-card">
                <div className="post-item-header">
                  <div className="post-item-meta">
                    <span className="post-item-author">Post Box</span>
                    <span className="post-item-time">{post.createdAt}</span>
                  </div>
                  <button
                    type="button"
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(post.id)}
                    title="Delete post"
                    aria-label={`Delete post from ${post.createdAt}`}
                  >
                    <svg className="delete-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
                <p className="post-item-content">{post.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PostBox;
