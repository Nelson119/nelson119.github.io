<template>
  <NuxtLayout bg-background>
    <div w-full h-full absolute flex flex-col>
      <div flex-grow-1 p-3 flex flex-col justify-center text-center border-3 border-strip border-solid rounded-4>
        <h3 text-primary text-center>設計不只是看起來漂亮，更重要的是讓人感覺自然、使用順暢。這段話是為了填滿空間，沒有特別含義，請您見諒。</h3>

        <Separator
          class="bg-stone-300/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]"
        />
        <p>設計不只是看起來漂亮，更重要的是讓人感覺自然、使用順暢。這段話是為了填滿空間，沒有特別含義，請您見諒。</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
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
