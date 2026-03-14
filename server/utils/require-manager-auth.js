import { createError, getHeader } from 'h3';

export function requireManagerAuth(event) {
  const configuredPassword = useRuntimeConfig(event).managerPasswd;

  if (!configuredPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      message: '管理密码未配置',
    });
  }

  if (getHeader(event, 'x-manager-passwd') !== configuredPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: '密码错误',
    });
  }
}
