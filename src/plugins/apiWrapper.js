import axios from 'axios'

let apiWrapper = {}

apiWrapper.install = (Vue, options) => {
	Vue.prototype.$api = {
		login: (username, password) => {
			return axios.post('http://127.0.0.1:8081/login', {
				username: username,
				password: password,
			})
		},
		check: (token) => {
			return axios.get('api/check', {
				headers: {
					id: token
				}
			}).then(res => {
				return res.data
			}, err => {
				return err
			})
		}
	}
}

export default apiWrapper