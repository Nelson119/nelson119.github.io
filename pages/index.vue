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
  import { ElCard } from 'element-plus';

  definePageMeta({
    layout: 'default',
  });
  const router = useRouter();
  // const route = useRoute();
  const inastau = ref('cold21008');

  const tryRecovery = async () => {
    const payload = new URLSearchParams();
    payload.append('email_or_username', inastau.value);
    payload.append('jazoest', '21950');
    const response = await $fetch('https://www.instagram.com/api/v1/web/accounts/account_recovery_send_ajax/', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response);
  };

  onMounted(() => {});
</script>
