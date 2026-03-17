<script setup>
const passwd = ref('');
const issueList = ref([]);
const authError = ref('');
const isAuthenticated = ref(false);

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
  issueList.value = issues.map((issue) => {
    issue.app_time = new Date(Number(issue.app_time) + 8 * 60 * 60000).toISOString();
    issue.reg_time = new Date(Number(issue.reg_time) + 8 * 60 * 60000).toISOString().replace('T', ' ');
    issue.closed_time = issue.closed_time
      ? new Date(Number(issue.closed_time) + 8 * 60 * 60000).toISOString().replace('T', ' ')
      : '';
    return issue;
  });
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
