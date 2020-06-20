import axios from 'axios'

export default axios.create({
	baseURL: 'https://quiz-ae23e.firebaseio.com/'
})