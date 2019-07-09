<template>
	<div>
		<form v-if="!loading" class="form" v-on:submit.prevent="onSubmit">
			<div class="input-field">
				<label for="title">Title</label>
				<input type="text" name="title" v-model="title" :class="[errors.title ? 'invalid' : 'validate']">
				<span class="helper-text" data-error="Title must not be empty."></span>
			</div>
			<div class="input-field">
				<label for="body">Body</label>
				<input type="text" name="body" v-model="body" :class="[errors.body ? 'invalid' : 'validate']">
				<span class="helper-text" data-error="Body must not be empty."></span>    
			</div>
			<button type="submit" class="waves-effect waves-light btn">
				{{ id ? 'Update' : 'Add' }}
			</button>
		</form>
		<div class="progress" v-else-if="loading">
			<div class="indeterminate"></div>
		</div>
	</div>
</template>

<script>
import PostService from '../PostService';

const ps = new PostService();

export default {
	name: 'PostForm',
	props: {
		editingPost: Object
	},
	data() {
		return {
			loading: false,
			title: '',
			body: '',
			id: null,
			errors: {}
		}
	},
	methods: {
		/**
		 * Event handler for the onSubmit event
		 */
		onSubmit() {
			this.loading = true;

			if (!this.validForm()) {
				this.loading = false;
				return; 
			}

			const post = {
				title: this.title,
				body: this.body,
				id: this.id
			};

			ps.writePost(post)
				.then((res) => { 
					this.loading = false;
                    
					this.title = '';
					this.body = '';

					this.$emit('postCreated', res.data);
				})
				.catch(error => console.log(error));
		},
		/**
		 * Determines if the form is valid or not
		 * @returns {Boolean} Returns true if the form is valid, false otherwise
		 */
		validForm() {
			this.errors = {};

			if (this.title.trim() === '') this.errors.title = 'title';

			if (this.body.trim() === '') this.errors.body = 'body';

			if (Object.keys(this.errors).length > 0) return false;

			return true;
		}
	},
	watch: {
		editingPost(post) {
			this.title = post.title;
			this.body = post.body;
			this.id = post.id;
		}
	}
}

</script>

<style scoped>

.form {
  margin: 3rem;
}

.progress {
  margin: 6rem 0;
}

</style>
