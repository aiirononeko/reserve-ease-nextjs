import { z } from 'zod'

export const setPasswordSchema = z.object({
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  // .regex(
  //   /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
  //   'パスワードは半角英数字混合で入力してください'
  // ),
  passwordConfirm: z.string().min(1, '確認用のパスワードを入力してください'),
})
// .superRefine(({ password, passwordConfirm }, ctx) => {
//   if (password !== passwordConfirm) {
//     ctx.addIssue({
//       path: ['passwordConfirm'],
//       code: 'custom',
//       message: 'パスワードが一致しません',
//     });
//   }
// });
