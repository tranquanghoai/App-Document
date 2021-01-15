import BaseService from '../BaseService'
import RNFetchBlob from 'rn-fetch-blob';
// import * as axios from 'axios'
import $param from 'jquery-param';

export default class SubmitService extends BaseService {
	constructor(slug) {
		super()
		this.slug = 'submit'
	}

	async submit(params) {
		const res = await this.post(this.slug, params)
		return res.data
	}
	async getList(params = {}) {
		const res = await this.get(this.slug + `/list?${$param(params)}`)
		return res.data
	}

	cancelSubmitFile(id) {
		return this.delete(this.slug + `/${id}`)
	}

	async createTextFile(file = {}) {
		try {
			const res = await this.post(this.slug + `/create-text`, file)
			return res.data
		} catch (error) {
			return this.errorMsg(e)
		}
	}

	async createImageFile(data = []) {
		const res = await this.fetchBlob({
			method: 'POST',
			url: this.slug + `/create-image`,
			data
		})
		return res
	}

	async updateImageFile(data = [], fileId) {
		console.log({ data, fileId })
		const res = await this.fetchBlob({
			method: 'PUT',
			url: this.slug + `/${fileId}`,
			data
		})
		return res
	}

	async create(folder = {}) {
		try {
			const res = await this.post(this.slug + `create`, folder)
			return res.data
		} catch (error) {
			return this.errorMsg(e)
		}
	}

	async update(id, params = {}) {
		const res = await this.post(`/api/v1/users/${id}`, params)
		return res.data
	}

	async getById(id) {
		const res = await this.get(`${this.slug}/${id}`)
		return res.data
	}

	async updateById(fileId, params) {
		const res = await this.put(`${this.slug}/${fileId}`, params)
		return res.data
	}

	deleteFile(fileId) {
		return this.delete(`${this.slug}/${fileId}`)
	}

	async destroy(id) {
		const res = await this.delete(`/api/v1/users/${id}`)
		return res.data
	}

	// async getList(params = {}) {
	// 	const res = await this.get(this.slug + `/list-file?${$param(params)}`)
	// 	return res.data
	// }
}