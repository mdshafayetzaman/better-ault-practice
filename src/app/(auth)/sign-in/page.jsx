'use client'

import { signIn } from '@/lib/auth-client'
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react'

const SignIn = () => {
  const onSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')

    const { data: resData, error } = await signIn.email({
      email,
      password,
      callbackURL: '/'
    })

    console.log(resData, error)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15181d] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl font-bold text-black">
            F
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm font-medium text-gray-200">Email</Label>

            <Input
              placeholder="john@example.com"
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#0d0f12] px-4 text-white outline-none"
            />

            <FieldError className="mt-1 text-sm text-red-400" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-200">
                Password
              </Label>

              <button
                type="button"
                className="text-sm text-lime-400 transition hover:text-lime-300"
              >
                Forgot password?
              </button>
            </div>

            <Input
              placeholder="Enter your password"
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#0d0f12] px-4 text-white outline-none"
            />

            <Description className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters.
            </Description>

            <FieldError className="mt-1 text-sm text-red-400" />
          </TextField>

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-lime-400 font-semibold text-black transition hover:bg-lime-300"
          >
            Sign In
          </Button>

          <Button
            type="reset"
            variant="secondary"
            className="h-12 w-full rounded-xl border border-white/10 bg-transparent text-gray-300 transition hover:bg-white/5"
          >
            Reset
          </Button>
        </Form>

        <div className="mt-7 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a
              href="/sign-up"
              className="font-medium text-lime-400 hover:text-lime-300"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
