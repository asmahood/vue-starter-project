import axios from 'axios';

const apiBaseURL = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev';

export default class PostService {
	getAllPosts() {
		return axios.get(`${apiBaseURL}/posts`);
	}


}