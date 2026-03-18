<script setup>
const passwd = ref('');
const issueList = ref([]);
const authError = ref('');
const isAuthenticated = ref(false);

function formatIssueDateTime(timestamp, separator = ' ') {
  if (!timestamp) {
    return '';
  }

  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date(Number(timestamp)));
  const partMap = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value])
  );

  return `${partMap.year}-${partMap.month}-${partMap.day}${separator}${partMap.hour}:${partMap.minute}:${partMap.second}`;
}

function managerHeaders() {
  return {
    'x-manager-passwd': passwd.value,
  };
}

async function getIssueList() {
  authError.value = '';

  let issues;

  try {
    issues = await $fetch('/api/issues', {
      headers: managerHeaders(),
    });
  } catch (error) {
    authError.value = error?.data?.message || error?.data?.statusMessage || error?.statusMessage || '登录失败';
    isAuthenticated.value = false;
    issueList.value = [];
    return;
  }

  isAuthenticated.value = true;
  issueList.value = issues.map((issue) => ({
    ...issue,
    app_time: formatIssueDateTime(issue.app_time, 'T'),
    reg_time: formatIssueDateTime(issue.reg_time),
    closed_time: formatIssueDateTime(issue.closed_time),
  }));
}

async function handleManageRequest(action) {
  authError.value = '';

  try {
    await action();
  } catch (error) {
    authError.value = error?.data?.message || error?.data?.statusMessage || error?.statusMessage || '操作失败';

    if ((error?.statusCode || error?.data?.statusCode) === 401) {
      isAuthenticated.value = false;
      issueList.value = [];
    }

    return false;
  }

  return true;
}

async function toggleIssue(issue) {
  const success = await handleManageRequest(() =>
    $fetch(`/api/issues/${issue.id}`, {
      method: 'PATCH',
      headers: managerHeaders(),
      body: { closed: !issue.closed },
    })
  );

  if (!success) {
    return;
  }

  await getIssueList();
}

async function deleteIssue(issueId) {
  if (import.meta.client && !window.confirm('确定要删除这条记录吗？')) {
    return;
  }

  const success = await handleManageRequest(() =>
    $fetch(`/api/issues/${issueId}`, {
      method: 'DELETE',
      headers: managerHeaders(),
    })
  );

  if (!success) {
    return;
  }

  await getIssueList();
}
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex justify-center items-center" v-show="!isAuthenticated">
      <div class="max-w-sm w-full">
        <div class="join w-full">
          <input type="password" class="input join-item w-full" v-model="passwd" placeholder="PassWord" />
          <button @click="getIssueList()" class="btn btn-outline btn-secondary join-item">LOGIN</button>
        </div>
        <div v-if="authError" class="alert alert-error mt-3 text-sm">
          {{ authError }}
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center" v-show="isAuthenticated">
      <div>
        <div v-if="authError" class="alert alert-error mb-3 text-sm">
          {{ authError }}
        </div>
        <table class="table table-sm sm:table">
          <thead>
            <tr>
              <th>姓名</th>
              <th class="hidden md:table-cell">班级</th>
              <th class="hidden xl:table-cell">学号</th>
              <th class="hidden lg:table-cell">电话</th>
              <th>日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <TableItem
              @toggle-issue="toggleIssue(issue)"
              @delete-issue="deleteIssue(issue.id)"
              v-for="issue in issueList"
              :key="issue.id"
              :issue="issue"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
