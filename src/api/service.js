'use strict'
import http from 'axios'

/**
 * 
 * @param {*} catalogId 
 * @param {*} name 
 * @param {string} sort_field name|visit
 * @param {string} sort_method  asc|desc
 */
export async function servie_list(opt) {
    let { catalogId, name, sort_field, sort_method, page, size } = opt || {}
    let url = `/service/list?`
    let params = []
    if (catalogId) {
        params.push("catalogId=" + catalogId)
    }
    if (name) {
        params.push("query=" + name)
    }

    if (sort_field & sort_method) {
        params.push("sort_field=" + sort_field)
        params.push("sort_method=" + sort_method)
    }

    if (page > 0) {
        params.push("page=" + page)
    }

    if (size > 0) {
        params.push("size=" + size)
    }

    url += params.join('&')

    let rlt = await http.get(url)
    if (rlt && rlt.status == 200) {
        return rlt.data || []
    }
    return []
}

export async function service_action(serviceId, action) {
    let url = "/service/action"
    let rlt = await http.post(url, {
        serviceId: serviceId,
        method: action
    })
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return false
}

export async function get(serviceId) {
    let url = '/service/get/' + serviceId
    let rlt = await http.post(url)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return null;
}

/**
 * 发布服务。这个特殊点，需要上传文件，同时也需要属性
 * @param {*} params 
 */
export async function publish(service_info) {
    var data = { ...service_info }
    data.metadata = JSON.stringify(data.metadata)
    data.subjects = data.service_catalog.join(',')
    delete data.service_catalog

    let formData = new FormData();
    for (const prop in data) {
        debugger
        formData.append(prop, data[prop])
    }
    let rlt = await http.post('/service/publish', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (rlt && rlt.status == 200) {
        rlt.data
    }
    return null;
}

export async function update(info) {
    let rlt = await http.post('/service/update', info)
    if (rlt && rlt.status == 200) {
        rlt.data
    }
    return null;
}

export async function visit(id) {
    return http.post(`/service/visit/${id}`)
}