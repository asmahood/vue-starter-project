import axios from 'axios';

// Set URL for API for ease of use
axios.defaults.baseURL = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev';

/**
 * A Post object
 * @typedef {Object} Post
 * @property {String} title The title of the post
 * @property {String} body The body of the post
 * @property {Number} id The ID of the post
 */

/**
 * A class to construct a API post service
 */
export default class PostService {
	/**
	 * Gets all posts from the API
	 * @returns {Promise<Object>} The response data from the API
	 */
	getAllPosts() {
		return axios.get('/posts');
	}
	
	/**
	 * Gets an certain number of posts from the API
	 * @param {Number} num 
	 * @returns {Promise<Object>}
	 */
	getPosts(num) {
		return axios.get(`/posts/${num}`);
	}

	/**
	 * Sends a PUT request to the API and writes a new post
	 * @param {Post} post The post to be sent to the API
	 */
	writePost(post) {
		if (post.id) {
			return axios.put(`/post/${post.id}`, post);
		}

		return axios.post('/post', post);
	}
}