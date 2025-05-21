<template>
  <div hero-section>
    <!-- 頁尾區域 -->
    <Footer theme="dark" />
  </div>
</template>

<script setup>
  // const authStore = useAuthStore();
  const router = useRouter();
  // const route = useRoute();

  const items = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const signIn = () => {
    router.push('/sign/in');
  };
  const signUp = () => {
    router.push('/sign/up');
  };

  onMounted(() => {});

  // definePageMeta({
  //   layout: 'default',
  // });
</script>
