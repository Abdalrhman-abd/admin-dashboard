import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')

  const onSubmit = (data) => {
    if (
      data.email === 'admin@gmail.com' &&
      data.password === '123456'
    ) {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/home')
    } else {
      setLoginError(
        'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100 p-4">

      <section className="w-full max-w-[450px] rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(147,51,234,0.15)] sm:p-8">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">
            <span className="text-purple-700">
              Admin
            </span>

            <span className="text-pink-500">
              Dashboard
            </span>
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >

          <div>

            <label
              htmlFor="email"
              className="mb-2 block font-medium text-purple-900"
            >
              البريد الالكتروني
            </label>

            <input
              type="email"
              id="email"
              placeholder="ادخل البريد الالكتروني"
              {...register('email', {
                required: 'البريد الالكتروني مطلوب'
              })}
              className="w-full rounded-xl border border-purple-200 p-3 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-pink-500">
                {errors.email.message}
              </p>
            )}

          </div>

          <div>

            <label
              htmlFor="password"
              className="mb-2 block font-medium text-purple-900"
            >
              كلمة المرور
            </label>

            <input
              type="password"
              id="password"
              placeholder="ادخل كلمة المرور"
              {...register('password', {
                required: 'كلمة المرور مطلوبة'
              })}
              className="w-full rounded-xl border border-purple-200 p-3 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-pink-500">
                {errors.password.message}
              </p>
            )}

          </div>

          {loginError && (
            <p className="rounded-xl bg-pink-50 p-3 text-center text-sm font-medium text-pink-600">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
          >
            تسجيل دخول
          </button>

        </form>

      </section>

    </div>
  )
}

export default LoginForm