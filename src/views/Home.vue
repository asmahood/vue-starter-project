<template>
	<div>
		<div class="row">
			<div class="col s6">
				<!-- Form -->
				<PostForm @postCreated="addPost" :editingPost="editingPost"/>
			</div>
			<div class="col s3" style="margin:3rem;">
				<p>Limit number of posts</p>
				<input type="number" name="" v-model="postLimit">
				<button @click="setLimit()" class="waves-effect waves-light btn">Set</button>
			</div>
		</div>
		<div class="row">
			<div class="col s6" v-for="(post, index) in posts"
				v-bind:item="post"
				:index="index"
				:key="post.id"
			>
				<div class="card">
					<div class="card-content">
						<p class="card-title">{{ post.title }}</p>
						<p class="timestamp">{{ post.createdAt | formatDate }}</p>
						<p>{{ post.body }}</p>
					</div>
					<div class="card-action">
						<a href="#" @click="editPost(post)">Edit</a>
						<a href="#" @click="deletePost(post.id)" class="delete-btn">Delete</a>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PostForm from '../components/PostForm.vue'

import PostService from '../PostService';

/**
 * A Post object
 * @typedef {Object} Post
 * @property {String} title The title of the post
 * @property {String} body The body of the post
 * @property {Number} id The ID of the post
 */

const ps = new PostService();

export default {
	name: "Home",
	components: {
		PostForm
	},
	data() {
		return {
			posts: [],
			postLimit: 5,
			editingPost: null
		}
	},
	created() {
		ps.getAllPosts()
			.then((res) => {
				this.posts = res.data;
			})
			.catch(err => console.error(err));
	},
	filters: {
		/**
		 * Transforms a timestamp string into a human readable date
		 * @param {String} date The date a post was created
		 * @returns {string}
		 */
		formatDate(date) {
			date = new Date(date);

			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();

			return `${day}-${month}-${year}`
		}
	},
	methods: {
		/**
		 * Adds a new post to the home page
		 * @param {Post} post The new post being added
		 */
		addPost(post) {
			const index = this.posts.findIndex(p => p.id === post.id);

			if (index !== -1) {
				this.posts.splice(index, 1, post);
			} else {
				this.posts.unshift(post);
			}
		},
		/**
		 * Edits an existing post from the home page
		 * @param {Post} post The post that is being edited
		 */
		editPost(post) {
			this.editingPost = post;
		},
		/**
		 * Deletes an existing post from the home page
		 * @param {Number} id The id of the post to be deleted
		 */
		deletePost(id) {
			ps.deletePost(id)
				.then(() => {
					this.posts = this.posts.filter(p => p.id !== id);
				})
				.catch(err => console.error(err));
		},
		/**
		 * Sets the number of posts to be displayed on the homepage
		 */
		setLimit() {
			ps.getPosts(this.postLimit)
				.then((res) => {
					this.posts = res.data
				})
				.catch(err => console.error(err));
		}
	}
};

</script>

<style scoped>

.card .card-content .card-title {
	margin-bottom: 0;
}

.card .card-content p.timestamp {
	color: #999;
	margin-bottom: 1rem;
}

.delete-btn {
	color: red !important;
}

</style>
