<script setup>
const passwd = ref('');
const issueList = ref([]);

async function getIssueList() {
  try {
    issueList.value = await $fetch('/api/issue_list', {
      query: { passwd: passwd.value },
    });

    issueList.value = issueList.value.map((issue) => {
      issue.app_time = new Date(Number(issue.app_time) + 8 * 60 * 60000).toISOString();
      issue.reg_time = new Date(Number(issue.reg_time) + 8 * 60 * 60000).toISOString().replace('T', ' ');
      issue.closed_time = new Date(Number(issue.closed_time) + 8 * 60 * 60000).toISOString().replace('T', ' ');
      return issue;
    });
  } catch (error) {
    alert('密码错误或网络错误');
    issueList.value = [];
  }
}
async function toggleIssue(issueId) {
  await $fetch(`/api/toggle_issue`, {
    query: {
      passwd: passwd.value,
      id: issueId,
    },
  });
  await getIssueList();
}
async function deleteIssue(issueId) {
  await $fetch(`/api/delet_issue`, {
    query: {
      passwd: passwd.value,
      id: issueId,
    },
  });
  await getIssueList();
}
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex justify-center items-center" v-show="!issueList.length">
      <div class="join max-w-sm">
        <input type="password" class="input join-item" v-model="passwd" placeholder="PassWord" />
        <button @click="getIssueList()" class="btn btn-outline btn-secondary join-item">LOGIN</button>
      </div>
    </div>
    <div class="flex justify-center items-center" v-show="issueList.length">
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
            @toggle-issue="toggleIssue(issue.id)"
            @delete-issue="deleteIssue(issue.id)"
            v-for="issue in issueList"
            :issue="issue"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
