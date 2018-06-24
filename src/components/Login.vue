<template>
	<div class="container">
		<br>
		<pre>{{data}}</pre>
		<pre>Cookie {{cookie}}</pre>
		<div class="row">
			<div class="col-lg-4 col-sm-1"></div>
			<div class="col-lg-4 col-sm-10">
				  <div class="form-group">
				    <label>Username</label>
				    <input v-model="username" class="form-control" placeholder="Enter username">
				  </div>
				  <div class="form-group">
				    <label>Password</label>
				    <input v-model="password" class="form-control" placeholder="Password">
				  </div>
				  <button class="btn btn-primary" @click="login">Submit</button>
			</div>
			<div class="col-log-4 col-sm-1">
				<div class="btn btn-succes" @click="checkCookie">Check cookie</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data: () => {
			return {
				username: '',
				password: '',
				data: '',
				cookie: ''
			}
		},
		methods: {
			login: function () {
				if (this.username && this.password) {
					this.$api.login(
						this.username,
						this.password
					).then(res => {
						console.log('res is', res)
						this.data = res.data
						this.$cookie.set('token', this.data.token)
					})
				}
			},
			checkCookie: function () {

			}
		},
		mounted () {
			console.log('token is', this.$cookie.get('token'));
			this.$api.check(this.$cookie.get('token')).then(res => {
				console.log('yeap', res)
			}, e => {
				console.log('error')
			})
		}
	}
</script>