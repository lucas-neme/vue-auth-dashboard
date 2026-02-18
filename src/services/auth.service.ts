export type LoginPayload = {
  email: string
  password: string
}

export async function loginService(payload: LoginPayload): Promise<void> {
  await Promise.resolve(payload)
}
