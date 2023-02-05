import {defineStore} from 'pinia';
import IUser from './index.types';

type errorMessage = string | undefined;

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => {
        return {
            user: null as IUser | null,
            isAuth: false
        } 
    },
    actions: {
        async login(email: string, password: string): Promise<errorMessage>{
            try {
                const {data, error} = await useFetch('/api/auth/login', {
                    method: "POST",
                    body: JSON.stringify({email, password})
                })
                if(!error.value){
                    this.setUser(data.value?.user as IUser); 
                    this.setAuth(true);
                    navigateTo("/");
                    localStorage.setItem('token', data.value?.accessToken!)
                }
                return error.value?.statusMessage;
            } catch(e){
                console.log(e);
            }
        },
        async register(email: string, password: string): Promise<errorMessage>{
            try {
                const {data, error} = await useFetch('/api/auth/register', {
                    method: "POST",
                    body: JSON.stringify({email, password})
                })
                if(!error.value){
                    this.setUser(data.value?.user as IUser); 
                    this.setAuth(true);
                    navigateTo("/");
                    localStorage.setItem('token', data.value?.accessToken!)
                }
                return error.value?.statusMessage;
            } catch(e){
                console.log(e);
            }
        },

        setUser(user: IUser | null){
            this.user = user;
        },
        setAuth(value: boolean){
            this.isAuth = value;
        },
        logout() {
            this.setUser(null);
            this.setAuth(false);
        },
        async checkAuth(){
            const {data, error} = await useFetch("/api/auth/refresh", {
                method: "GET"
            });
            console.log(data.value);
            if(!error.value && data.value){
                localStorage.setItem("token", data.value?.accessToken!);
                this.setAuth(true);
                this.setUser(data.value.user);
            }
        }
    },
    getters: {
        getUser: (state): IUser | null => state.user,
        getAuthenticatedStatus: (state): boolean => state.isAuth
    }

})