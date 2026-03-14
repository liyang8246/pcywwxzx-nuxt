<script setup>
useHead({
  title: '电脑义务维修中心',
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100">
    <Header />
    <!--    <div class="alert alert-error alert-soft border-none rounded-none text-center mb-2">-->
    <!--      由于学校峡谷杯以及端午调休规定，本部门于5月28日起停止日常值班，于6月3日起恢复日常值班. 若需紧急协助维修等服务, 请点击下方【QQ咨询群】寻求技术协助!-->
    <!--    </div>-->
    <NuxtPage class="flex-grow" />
    <p class="text-xs text-gray-500 text-center p-4 mr-auto">&copy; 2025. 电脑义务维修中心. All rights reserved.</p>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
