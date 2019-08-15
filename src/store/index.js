import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import dayjs from 'dayjs'

Vue.use(Vuex)
var CODE = 100;
export default new Vuex.Store({
    state: {
        userName: '',
        userInfo: {},
        userId: '',
        sid: null,
        access: [
            { name: '发布服务', code: 100, visible: false },
            { name: '删除服务', code: 101, visible: false },
            { name: '启动/停止服务', code: 102, visible: false },
            { name: '编辑服务信息', code: 103, visible: false },
            { name: '系统配置', code: 104, visible: false },
            { name: '服务字典', code: 105, visible: false },
            { name: '授权管理', code: 106, visible: false },
            { name: '系统管理', code: 107, visible: false },
            { name: '服务监控', code: 108, visible: false },
        ],
        service_list: {
            list: [],
            total: 0
        },
        service_filter: {
            page: 1,
            size: 5,
            catalogId: null,
            name: null,
            sort_field: null,
            sort_method: 0,
            aggrate: true,
        },
        catalog_list: [],
        current_catalog: {}
    },
    mutations: {
        setUser(state, { userName, userId, userInfo, sid, access }) {
            if (userName == 'admin') {
                access = "*"
            }
            state.userName = userName
            state.userId = userId
            state.userInfo = userInfo
            state.sid = sid
            if (access == "*") {
                state.access.forEach(r => r.visible = true)
            } else {
                access = (access instanceof Array) ? access : JSON.parse(access)
                for (const acc of access || []) {
                    var item = state.access.find(r => r.code === acc * 1)
                    if (item) {
                        item.visible = true
                    }
                }
            }
        },
        setQueryFilter(state, filter) {
            var mix = { ...state.service_filter, ...filter }
            state.service_filter = mix
        },
        setQueryData(state, { list, total }) {
            state.service_list.list = list
            state.service_list.total = total
        },
        setCatalogList(state, data) {
            state.catalog_list = data
        },
        setCatalog(state, catalog) {
            if (!catalog) {
                state.current_catalog = {}
            } else {
                state.current_catalog = catalog
            }
        }
    },
    actions: {
        queryService(store, filter) {
            filter = filter || {}
            this.commit('setQueryFilter', filter)
            api.service.servie_list(this.state.service_filter).then(data => {
                var list = data.list.map(r => {
                    if (r.metadata) {
                        r.metadata = JSON.parse(r.metadata);
                    } else {
                        r.metadata = {};
                    }

                    if (r.keyword) {
                        r.keyword = r.keyword.split(";");
                    } else {
                        r.keyword = [];
                    }
                    r.pubdate = dayjs(r.createAt).format("YYYY-MM-DD");
                    r.status = !!r.status;
                    return r;
                });
                this.commit('setQueryData', { list: list, total: data.total })
                var opt = { ...this.state.service_filter }
                opt.page = data.pageNum
                opt.size = data.pageSize;
                this.commit('setQueryFilter', opt)
            }).catch(err => {
                console.error(err)
            })
        },
        queryCatalog() {
            api.catalog.catalog_list().then(data => {
                this.commit('setCatalogList', data);
            });
        }
    },
    modules: {
        app
    }
})