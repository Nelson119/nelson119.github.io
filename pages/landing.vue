<template>
  <NuxtLayout>
    <div flex items-center>
      <ElCard w-full py-15px>
        <ElForm flex flex-col gap-10px max-w-500px mx-auto>
          <ElFormItem>
            <ElInput v-model="inastau" />
          </ElFormItem>

          <ElFormItem>
            <ElButton @click="tryRecovery">看結果</ElButton>
          </ElFormItem>
        </ElForm>
      </ElCard>
    </div>
  </NuxtLayout>
</template>

<script setup>
  definePageMeta({
    layout: 'default',
  });
  const router = useRouter();
  // const route = useRoute();

  const items = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // const signIn = () => {
  //   router.push('/sign/in');
  // };
  // const signUp = () => {
  //   router.push('/sign/up');
  // };

  onMounted(() => {});

  // definePageMeta({
  //   layout: 'default',
  // });
</script>
