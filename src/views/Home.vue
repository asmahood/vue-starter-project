<template>
	<div class="row">
		<div class="col s6" v-for="(post, index) in posts"
			v-bind:item="post"
			:index="index"
			:key="post.id"
		>
			<div class="card">
				<div class="card-content">
					<p class="card-title">{{ post.title }}</p>
					<p class="timestamp">{{ post.createdAt }}</p>
					<p>{{ post.body }}</p>
				</div>
				<div class="card-action">
					<a href="#">Edit</a>
					<a href="#" class="delete-btn">Delete</a>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
import PostService from '../PostService';

const ps = new PostService();

export default {
	name: "Home",
	data() {
		return {
			posts: []
		}
	},
	created() {
		ps.getAllPosts()
			.then((res) => {
				this.posts = res.data;
			})
			.catch(error => console.log(error));
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
