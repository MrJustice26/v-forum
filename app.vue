<template>
  <Html lang="en">
    <Head>
      <Title>V-Forum</Title>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" />
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap"
      />
    </Head>
  </Html>

  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
</script>
