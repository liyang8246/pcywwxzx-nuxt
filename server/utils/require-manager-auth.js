import { createHash, timingSafeEqual } from 'node:crypto';
import { createError, getHeader } from 'h3';

function createPasswordDigest(value) {
  return createHash('sha256').update(value).digest();
}

export function requireManagerAuth(event) {
  const configuredPassword = useRuntimeConfig(event).managerPasswd;

  if (!configuredPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      message: '管理密码未配置',
    });
  }

  const providedPassword = getHeader(event, 'x-manager-passwd') ?? '';
  const isAuthorized = timingSafeEqual(
    createPasswordDigest(String(providedPassword)),
    createPasswordDigest(String(configuredPassword))
  );

  if (!isAuthorized) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: '密码错误',
    });
  }
}
