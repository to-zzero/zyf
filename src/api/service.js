// 'use strict'
import http from 'axios'


export async function getSiteInfo() {
    let url = "/service/siteinfo"
    let rlt = await http.get(url)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return {}
}

/**
 * 
 * @param {*} catalogId 
 * @param {*} name 
 * @param {string} sort_field name|visit
 * @param {string} sort_method  asc|desc
 */
export async function servie_list(opt) {
    let { catalogId, name, sort_field, sort_method, page, size, aggrate } = opt || {}
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

    if (aggrate === false) {
        params.push("aggrate=false")
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

export async function getCapabilities(serviceId) {
    let url = '/service/GetCapabilities/' + serviceId
    let rlt = await http.get(url)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return null;
}

export async function getProxy() {
    let url = '/arcgis/proxy'
    let rlt = await http.get(url)
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
        if (prop === 'file') {
            formData.append(prop, data[prop].raw)
            formData.append('fileName', data[prop].name)
        } else {
            formData.append(prop, data[prop])
        }
    }
    let rlt = await http.post('/service/publish', formData, { timeout: 0 })
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return null;
}

export async function getStatus(id) {
    let rlt = await http.get('/service/publish/' + id, { timeout: 0 })
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return false;
}

export async function update(info) {
    delete info.createAt
    delete info.updateAt
    let formData = new FormData();
    for (const prop in info) {
        formData.append(prop, info[prop])
    }

    let rlt = await http.post('/service/update', formData)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return null;
}

export async function visit(id) {
    return http.post(`/service/visit/${id}`)
}

export async function updateThumbnail(id, file) {
    let formData = new FormData();
    formData.append('file', file)

    let rlt = await http.post(`/service/update-thumbnail/${id}`, formData)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return null;
}

export async function getThumbnail(id) {
    var resp = await http.get(`/service/thumbnail/${id}`)
    if (resp && resp.data)
        return resp.data
    return null
}

export async function deleteAggrateCache(id) {
    var resp = await http.post(`/service/aggregate/clear_cache/${id}`)
    if (resp && resp.data)
        return resp.data
    return false
}

export async function getTileCacheStatus(id) {
    var resp = await http.get(`/service/cacheStatus/${id}`)
    if (resp && resp.data)
        return resp.data
    return null
}

export async function rebuildCache(id) {
    var resp = await http.post(`/service/rebuildCache/${id}`)
    if (resp && resp.data)
        return resp.data
    return null
}


export async function servelog(page = 1, size = 20) {
    var resp = await http.get(`/service/servelog/list?page=${page}&size=${size}`)
    if (resp.status === 200) {
        return resp.data
    }
    return null;
}

export async function checkname(name) {
    var resp = await http.get(`/service/checkname?name=${name}`)
    if (resp.status === 200) {
        return resp.data
    }
    return true;
}

export async function create_aggrate_service(serviceInfo, aggrateInfo, subjects, minZoom, maxZoom) {
    var resp = await http.post(`/service/aggregate`, {
        subjects: (subjects || []).join(','),
        service: JSON.stringify(serviceInfo),
        aggrate: JSON.stringify({ minZoom, maxZoom, layers: aggrateInfo }),
    })
    if (resp.status === 200) {
        return resp.data
    }
    return false;
}

//监控-最近1小时
export async function monitor1Hour(serviceId) {
    var resp = await http.get(`/service/servelog/monitor?serviceId=${serviceId}&type=minute`)
    if (resp.status === 200) {
        return resp.data//[{time:'2019-08-01 01:00:00',count:1}]
    }
    return true;
}

//监控-最近24小时
export async function monitor24Hour(serviceId) {
    var resp = await http.get(`/service/servelog/monitor?serviceId=${serviceId}&type=hour`)
    if (resp.status === 200) {
        return resp.data//[{time:'2019-08-01 00:00:00',count:2,duration:100}]
    }
    return true;
}


//流量-type:today|yesterday|week|month  from:时间戳 to:时间戳 prop:all service user
export async function statAmount(type, prop, from, to) {
    var resp = await http.get(`/service/servelog/amount?type=${type}&prop=${prop}&from=${from}&to=${to}}`)
    if (resp.status === 200) {
        return resp.data
        //[{time:'2019-08-01 00:00:00',datasize:100}]--all
        //[{name:'xxxx',datasize:100}]--service
        //[{name:'xxxx',datasize:100}]--user
    }
    return true;
}

//访问量-type:today|week|month  from:时间戳 to:时间戳
export async function statCount(type, from, to) {
    var resp = await http.get(`/service/servelog/count?type=${type}&from=${from}&to=${to}}`)
    if (resp.status === 200) {
        return resp.data
    }
    return true;
}

//警告-type:today|week|month  from:时间戳 to:时间戳
export async function statWarn(type, from, to) {
    var resp = await http.get(`/service/servelog/warn?type=${type}&from=${from}&to=${to}}`)
    if (resp.status === 200) {
        return resp.data
    }
    return true;
}

//获取时间区间的警告日志
export async function queryWarnLog(from, to, page, size) {
    var resp = await http.get(`/service/servelog/warn?type=${type}&from=${from}&to=${to}}&page=${page}&size=${size}`)
    if (resp.status === 200) {
        return resp.data
    }
    return true;
}