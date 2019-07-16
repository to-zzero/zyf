import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var CODE = 100;
export default new Vuex.Store({
    state: {
        userName: '',
        userInfo: {},
        userId: '',
        sid: null,
        access: [
            { name: '发布服务', code: CODE++, visible: false },
            { name: '删除服务', code: CODE++, visible: false },
            { name: '启动/停止服务', code: CODE++, visible: false },
            { name: '服务聚合', code: CODE++, visible: false },
            { name: '系统配置', code: CODE++, visible: false },
            { name: '服务目录配置', code: CODE++, visible: false },
            { name: '用户管理', code: CODE++, visible: false },
            { name: '权限管理', code: CODE++, visible: false },

        ],
    },
    mutations: {
        setUser(state, { userName, userId, userInfo, sid, access }) {
            state.userName = userName
            state.userId = userId
            state.userInfo = userInfo
            state.sid = sid
            if (access = "*") {
                state.access.forEach(r => r.visible = true)
            } else {
                access = access.split(',')
                for (const acc of access || []) {
                    var item = state.access.find(r => r.code === acc * 1)
                    if (item) {
                        item.visible = true
                    }
                }
            }
        },
    },
    actions: {
        //
    },
    modules: {
        app
    }
})