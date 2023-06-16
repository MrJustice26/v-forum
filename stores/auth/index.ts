import { defineStore } from 'pinia'
import IUser from './index.types'

type errorMessage = string | undefined

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            user: null as IUser | null,
            isAuth: false,
            isFetching: false,
        }
    },
    actions: {
        async login(email: string, password: string): Promise<errorMessage> {
            try {
                const { data, error } = await useFetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                })
                if (!error.value) {
                    this.setUser(data.value?.user as IUser)
                    this.setAuth(true)
                    localStorage.setItem('token', data.value?.accessToken!)
                }
                return error.value?.statusMessage
            } catch (e) {
                console.log(e)
            }
        },
        async register(
            username: string,
            email: string,
            password: string
        ): Promise<errorMessage> {
            try {
                const { data, error } = await useFetch('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, username }),
                })
                if (!error.value) {
                    this.setUser(data.value?.user as IUser)
                    this.setAuth(true)
                    localStorage.setItem('token', data.value?.accessToken!)
                }
                return error.value?.statusMessage
            } catch (e) {
                console.log(e)
            }
        },

        setUser(user: IUser | null) {
            this.user = user
        },
        setAuth(bool: boolean) {
            this.isAuth = bool
        },
        setFetchingStatus(bool: boolean) {
            this.isFetching = bool
        },
        logout() {
            this.setUser(null)
            this.setAuth(false)
            localStorage.removeItem('token')
        },
        async checkAuth() {
            const { data, error } = await useFetch('/api/auth/refresh', {
                method: 'GET',
            })
            if (!error.value && data.value) {
                localStorage.setItem('token', data.value?.accessToken!)
                this.setAuth(true)
                this.setUser(data.value.user)
            }
        },
    },
    getters: {
        getUser: (state): IUser | null => state.user,
        getAuthenticatedStatus: (state): boolean => state.isAuth,
        getFetchingStatus: (state): boolean => state.isFetching,
    },
})
