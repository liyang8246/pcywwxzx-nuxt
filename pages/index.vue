<script setup lang="ts">
const { data: stats } = await useFetch<{ count: number, days: number }>('/api/issues/stats')

const issueNum = computed(() => stats.value?.count ?? 0)
const dateNum = computed(() => stats.value?.days ?? 0)
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="max-w-lg gap-12 justify-center lg:flex lg:max-w-none">
      <div class="max-w-lg mx-4 flex flex-col space-y-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-base-content">
            广东第二师范学院
          </h1>
          <h1 class="text-3xl md:text-4xl font-bold text-primary ml-14">
            电脑义务维修中心
          </h1>
        </div>
        <p class="text-base-content">
          电脑义务维修中心于2015年9月创办, 是计算机学院学生党支部旗下的一支公益性特色服务团队, 以电脑维修工作为重点,
          以丰富校园科技文化为己任. 为切实弘扬志愿服务精神, 本中心无偿为全校师生提供电脑义务维修服务.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <AppButton variant="soft" color="primary" @click="navigateTo('/booking')">
            预约维修
          </AppButton>
          <div class="flex">
            <a
              href="https://qm.qq.com/q/flBStssyFa"
              target="_blank"
              class="flex items-center rounded-s-md bg-base-200 px-4 py-2 text-base-content transition-colors hover:bg-base-content/15"
            > QQ咨询群 </a>
            <a
              href="https://doc.pcywwxzx.top"
              target="_blank"
              class="flex items-center border-x-1 border-base-content/15 bg-base-200 px-4 py-2 text-base-content transition-colors hover:bg-base-content/15"
            > 维修文档 </a>
            <button
              class="flex cursor-pointer items-center rounded-e-md bg-base-200 px-4 py-2 text-base-content transition-colors hover:bg-base-content/15"
              @click="navigateTo('/manage')"
            >
              管理后台
            </button>
          </div>
        </div>
      </div>
      <div class="h-0.5 min-w-fit my-8 bg-base-200 lg:w-0.5 lg:h-auto lg:my-0" />
      <div class="max-w-lg mx-4 flex flex-col space-y-4">
        <h1 class="text-3xl md:text-4xl font-bold text-base-content">
          关于我们
        </h1>
        <div class="flex space-x-2">
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            累计维修
          </h1>
          <h1 class="text-3xl font-bold text-primary w-20 text-center">
            {{ issueNum }}
          </h1>
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            次
          </h1>
        </div>
        <div class="flex space-x-2">
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            维修时长
          </h1>
          <h1 class="text-3xl font-bold text-primary w-20 text-center">
            {{ dateNum }}
          </h1>
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            天
          </h1>
        </div>
        <div class="flex space-x-2">
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            目前在岗
          </h1>
          <h1 class="text-3xl font-bold text-primary w-20 text-center">
            47
          </h1>
          <h1 class="text-2xl mt-auto font-bold text-base-content">
            人
          </h1>
        </div>
        <div class="flex items-center gap-x-2">
          <Icon name="lucide:clock" class="flex-none scale-110 text-base-content/40" />
          <p class="text-sm text-base-content">
            工作日 20:40 - 21:30
          </p>
        </div>
        <div class="flex items-center gap-x-2">
          <Icon name="lucide:map-pin" class="flex-none scale-110 text-base-content/40" />
          <p class="text-sm text-base-content">
            学生宿舍一栋三楼西南侧
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
