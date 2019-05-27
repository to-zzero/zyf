'use strict'
import http from 'axios'

export async function servie_list(catalogId) {
    var rlt = await http.get(`/service/list/${catalogId}`)
    if (rlt && rlt.status == 200) {
        return rlt.data || []
    }
    return []
}