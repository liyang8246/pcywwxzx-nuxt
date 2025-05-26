<script setup>
const formData = ref({
  id: null,
  uid: '',
  name: '',
  class: '',
  phone: '',
  problem: '',
  reg_time: null,
  app_time: '',
  closed: false,
  closed_time: null,
});

const alertInfo = ref({
  info: '',
  error: '',
});

async function submit() {
  const postJson = formData.value;
  alertInfo.value.error = '';
  alertInfo.value.info = '';
  if (postJson.name == '') {
    alertInfo.value.error = '请填写姓名';
    return;
  }
  if (postJson.uid == '') {
    alertInfo.value.error = '请填写学号';
    return;
  }
  if (postJson.phone == '') {
    alertInfo.value.error = '请填写电话';
    return;
  }
  if (postJson.class == '') {
    alertInfo.value.error = '请填写班级';
    return;
  }
  if (postJson.problem == '') {
    alertInfo.value.error = '请填写详情';
    return;
  }
  if (postJson.app_time == '') {
    alertInfo.value.error = '请选择预约日期';
    return;
  }
  if (postJson.phone.length != 11) {
    alertInfo.value.error = '请填写11位电话';
    return;
  }
  if (postJson.uid.length != 11) {
    alertInfo.value.error = '请填写11位学号';
    return;
  }
  $fetch('/api/new_issue', {
    method: 'PUT',
    body: postJson,
  })
    .then((response) => {
      alertInfo.value.info = response;
    })
    .catch((error) => {
      alertInfo.value.error = error.response._data.message;
    });
}

const hasChecked = ref({
  userAgreement: false,
  triedMyself: false,
  describedInDetail: false,
  comeEarly: false,
});
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="max-w-lg gap-12 justify-center lg:flex lg:max-w-none">
      <div class="max-w-lg space-y-3 mx-4">
        <p class="font-semibold text-3xl">寻找我们提供帮助</p>
        <p class="text-base-content">
          &ensp;&ensp;&ensp;&ensp;电脑义务维修中心于2015年9月创办, 是计算机学院学生党支部旗下的一支公益性特色服务团队,
          以电脑维修工作为重点, 以丰富校园科技文化为己任. 为切实弘扬志愿服务精神,
          本中心无偿为全校师生提供电脑义务维修服务.
        </p>
        <p class="text-base-content">
          &ensp;&ensp;&ensp;&ensp;电脑义务维修中心为弘扬志愿服务精神, 无偿为师生提供电脑义务维修服务. 维修前,
          维修人员会提前告知可能存在的风险, 机主在自行考虑后决定是否交由维修人员进行维修.
          若因静电等不可抗力因素导致维修物品损坏或数据丢失等情况, 本中心概不承担任何赔偿责任. 请确定前往维修的师生们,
          已充分了解并同意此免责声明, 感谢您的理解与支持!
        </p>
        <div class="flex items-center gap-x-2">
          <span class="flex-none text-gray-400 scale-110 icon-[material-symbols--schedule-outline]" />
          <p class="text-sm text-base-content">工作日 19:00 - 20:00</p>
        </div>
        <div class="flex items-center gap-x-2">
          <span class="flex-none text-gray-400 scale-110 icon-[material-symbols--location-on-outline]" />
          <p class="text-sm text-base-content">学生宿舍一栋三楼西南侧</p>
        </div>
      </div>
      <div class="h-0.5 min-w-fit my-8 bg-gray-100 lg:w-0.5 lg:h-auto lg:my-0"></div>
      <div class="max-w-lg space-y-2 mx-4">
        <div class="flex items-center gap-x-2 w-full">
          <Input label="姓名" altLabel="你的真实姓名" v-model="formData.name" />
          <Input label="学号" altLabel="你的11位学号" v-model="formData.uid" />
        </div>
        <Input label="电话" altLabel="用于特殊情况通知" v-model="formData.phone" />
        <div class="flex items-center gap-x-2 w-full">
          <Input label="班级" altLabel="例: 22计算机教育B班" v-model="formData.class" />
        </div>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-xs"> 预约日期 </span>
          </div>
          <DatePicker v-model="formData.app_time" class="w-full" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-xs"> 详细问题 </span>
          </div>
          <textarea class="textarea h-25 p-1" v-model="formData.problem"></textarea>
          <div class="label">
            <span class="label-text-alt"> 尽可能详细地说明问题以及前因后果,最好备注上电脑型号 </span>
          </div>
        </label>
        <div class="flex items-end justify-between">
          <div class="flex flex-col space-y-4">
            <label class="flex cursor-pointer items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm mr-2"
                v-model="hasChecked.userAgreement"
              />
              <div class="my-auto font-medium text-base-content text-sm lg:hidden flex">我已阅读并同意上侧条款</div>
              <div class="my-auto font-medium text-base-content text-sm hidden lg:flex">我已阅读并同意左侧条款</div>
            </label>
            <label class="flex cursor-pointer items-center" v-show="hasChecked.userAgreement">
              <input
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm mr-2"
                v-model="hasChecked.triedMyself"
              />
              <div class="my-auto font-medium text-base-content text-sm">我已尝试搜索问题并自己解决</div>
            </label>
            <label class="flex cursor-pointer items-center" v-show="hasChecked.triedMyself">
              <input
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm mr-2"
                v-model="hasChecked.describedInDetail"
              />
              <div class="my-auto font-medium text-base-content text-sm">我已尽可能详细地描述问题</div>
            </label>
            <label class="flex cursor-pointer items-center" v-show="hasChecked.describedInDetail">
              <input
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm mr-2"
                v-model="hasChecked.comeEarly"
              />
              <div class="my-auto font-medium text-base-content text-sm">我会尽量早来不让工作人员加班</div>
            </label>
          </div>
          <button v-show="!hasChecked.comeEarly" class="btn text-sm btn-disabled">提交预约</button>
          <button @click="submit()" v-show="hasChecked.comeEarly" class="btn text-sm btn-primary">提交预约</button>
        </div>
        <div>
          <div v-if="alertInfo.info" class="alert alert-success mt-4" role="alert">
            {{ alertInfo.info }}
          </div>
          <div v-if="alertInfo.error" class="alert alert-error mt-4" role="alert">
            {{ alertInfo.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
