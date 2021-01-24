import BaseService from '../BaseService'
import RNFetchBlob from 'rn-fetch-blob';
// import * as axios from 'axios'
import $param from 'jquery-param';

export default class DepartmentService extends BaseService {
	constructor(slug) {
		super()
		this.slug = 'department'
	}
	async getMyDepartment() {
		try {
			const res = await this.get(this.slug + `/my-department`)
			return res.data
		} catch (e) {
			return this.errorMsg(e)
		}
	}

	async getFormDetal(formId) {
		try {
			const res = await this.get(this.slug + `/${formId}`)
			return res.data
		} catch (e) {
			return this.errorMsg(e)
		}
	}

	// async createTextFile(file = {}) {
	// 	try {
	// 		const res = await this.post(this.slug + `/create-text`, file)
	// 		return res.data
	// 	} catch (error) {
	// 		return this.errorMsg(e)
	// 	}
	// }

	// async createImageFile(data = []) {
	// 	const res = await this.fetchBlob({
	// 		method: 'POST',
	// 		url: this.slug + `/create-image`,
	// 		data
	// 	})
	// 	return res
	// }

	// async updateFile(fileId, params = {}) {
	// 	const res = await this.put(this.slug + `/${fileId}`, params)
	// 	return res.data
	// }

	// async updateImageFile(data = [], fileId) {
	// 	const res = await this.fetchBlob({
	// 		method: 'PUT',
	// 		url: this.slug + `/${fileId}`,
	// 		data
	// 	})
	// 	return res
	// }

	// transferFile(params = {}) {
	// 	return this.post(this.slug + `/change-folder`, params)
	// }

	// async create(folder = {}) {
	// 	try {
	// 		const res = await this.post(this.slug + `create`, folder)
	// 		return res.data
	// 	} catch (error) {
	// 		return this.errorMsg(e)
	// 	}
	// }

	// async update(id, params = {}) {
	// 	const res = await this.post(`/api/v1/users/${id}`, params)
	// 	return res.data
	// }

	// async getById(id) {
	// 	const res = await this.get(`${this.slug}/${id}`)
	// 	return res.data
	// }

	// async updateById(fileId, params) {
	// 	const res = await this.put(`${this.slug}/${fileId}`, params)
	// 	return res.data
	// }

	// deleteFile(fileId) {
	// 	return this.delete(`${this.slug}/${fileId}`)
	// }

	// async destroy(id) {
	// 	const res = await this.delete(`/api/v1/users/${id}`)
	// 	return res.data
	// }

	// async getList(params = {}) {
	// 	const res = await this.get(this.slug + `/list-file?${$param(params)}`)
	// 	return res.data
	// }
}