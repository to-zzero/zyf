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
            { name: '发布服务', code: 100, visible: false },
            { name: '删除服务', code: 101, visible: false },
            { name: '启动/停止服务', code: 102, visible: false },
            { name: '编辑服务信息', code: 103, visible: false },
            { name: '系统配置', code: 104, visible: false },
            { name: '服务字典', code: 105, visible: false },
            { name: '授权管理', code: 106, visible: false },
            { name: '系统管理', code: 107, visible: false },
            { name: '服务监控', code: 108, visible: false },

        ]
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
    },
    actions: {
        //
    },
    modules: {
        app
    }
})