import BaseService from '../BaseService'
import RNFetchBlob from 'rn-fetch-blob';
// import * as axios from 'axios'
import $param from 'jquery-param';

export default class FolderService extends BaseService {
	constructor(slug) {
		super()
		this.slug = 'folder/'
	}
	async getList(params = {}) {
		try {
			const res = await this.get(this.slug + `list-folder?${$param(params)}`)
			return res.data
		} catch (e) {
			return this.errorMsg(e)
		}
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
		const res = await this.put(`${this.slug}${id}`, params)
		return res.data
	}

	deleteFolder(id) {
		return this.delete(`${this.slug}${id}`)
	}

	async getById(id) {
		const res = await this.get(`${this.slug}${id}`)
		return res.data

	}

	async destroy(id) {
		const res = await this.delete(`/api/v1/users/${id}`)
		return res.data
	}
}