import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName: '',
        userInfo: {},
        userId: '',
        sid: null,
        access: []
    },
    mutations: {
        setUser(state, { userName, userId, userInfo, sid, access }) {
            state.userName = userName
            state.userId = userId
            state.userInfo = userInfo
            state.sid = sid
            state.access = access || []
        },
    },
    actions: {
        //
    },
    modules: {
        app
    }
})