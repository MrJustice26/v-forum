import {defineStore} from 'pinia';


export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            email: '',
            isAuthenticated: false
        } 
    },
    actions: {
        setUser(email: string) {
            this.email = email;
        } 
    },
    getters: {
        getEmail: state => state.email,
        getAuthenticatedStatus: state => state.isAuthenticated
    }

})