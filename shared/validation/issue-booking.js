import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { issues } from '../../server/db/schema.postgresql';

export const issueBookingSchema = createInsertSchema(issues, {
  uid: (schema) => schema.trim().min(1, '请填写学号').length(11, '请填写11位学号'),
  name: (schema) => schema.trim().min(1, '请填写姓名'),
  class: (schema) => schema.trim().min(1, '请填写班级'),
  problem: (schema) => schema.trim().min(1, '请填写详情'),
  phone: (schema) => schema.trim().min(1, '请填写电话').length(11, '请填写11位电话'),
  app_time: () => z.coerce.number().int().positive('请选择预约日期'),
})
  .omit({
    id: true,
    reg_time: true,
    closed: true,
    closed_time: true,
  })
  .strict();

export function getIssueBookingErrorMessage(error) {
  return Object.values(error.flatten().fieldErrors).flat()[0] ?? error.issues[0]?.message ?? '提交失败';
}
