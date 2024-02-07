import { defineStore } from "pinia";

export const useProfileStore = defineStore(
    'profile',
    () => {
        const login = ref({ email: '', password: '' });
        function setLogin(email: string, password: string) {
            login.value = { email, password };
        }
        function checkLogin() {
            return login.value.email !== '' && login.value.password !== '';
        }
        return { login, setLogin, checkLogin };
    },
);