export const useAuthStore = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(true);
    const user = ref<{ username: string } | null>(null);

    async function login(username: string, password: string) {
      if (username === 'abc' && password === 'password123') {
        isAuthenticated.value = true;
        user.value = { username };
        return true;
      } else {
        isAuthenticated.value = false;
        user.value = null;
        return false;
      }
    }

    async function register(username: string, password: string) {
      // 檢查 username 和 password 是否有效
      if (!username || !password) {
        throw new Error('帳號和密碼不能為空');
      }

      // 模擬註冊邏輯（這裡可以假裝與後端互動）
      // 假設註冊成功後，儲存使用者資料，但不自動登入
      user.value = { username };
      isAuthenticated.value = false; // 註冊後需要重新登入
      return true;
    }

    function logout() {
      isAuthenticated.value = false;
      user.value = null;
      const router = useRouter();
      router.push('/landing');
    }

    return { isAuthenticated, user, login, register, logout };
  },
  {
    persist: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
  }
);
