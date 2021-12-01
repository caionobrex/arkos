import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import InputField from '../components/InputField'
import Logo from '../public/imgs/logo.svg'
import LoginPageImg from '../public/login-page-img.svg'
import { Formik } from 'formik'
import { MdLogin, MdSync } from 'react-icons/md'
import { signIn as login } from 'next-auth/client'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const variants = {
  fieldWrong: { borderColor: 'red' },
  fieldValid: { borderColor: 'green' }
}

const LoginCard = ({ validate, onSubmitHandler, error }) => {
  return (
    <Formik
      initialValues={{ email: '', pass: '' }}
      validate={validate}
      onSubmit={onSubmitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <div className={`shadow-xl w-full rounded-xl border-2 transition-all duration-500 p-8 md:p-14 ${error && 'border-red-500'}`}>
          <h1 className="text-center text-3xl font-medium text-gray-800">
            Seja bem-vindo!
          </h1>
          <form className="mt-10 block" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-6">
              <InputField
                type="email"
                name="email"
                label="Email"
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputField
                type="password"
                name="pass"
                label="Senha"
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col items-center gap-y-8 mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-x-3 rounded-xl bg-primary px-20 py-2 border-2 border-primary text-white transition-all hover:text-gray-700 hover:bg-transparent"
              >
                {isSubmitting ? 'Entrando' : 'Entrar'} {isSubmitting ? <MdSync className="text-xl animate-spin text-lg" /> : <MdLogin className="text-lg" />}
              </button>
              <span className="text-sm">
                Ainda não possui cadastro ? <Link href="/cadastro"><a className="text-blue-500">Cadastre-se</a></Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { user, signIn, loading } = useUser()
  const [error, setError] = useState(false)
  
  const validate = (values) => {
    const errors = {}
    if (!values.email) errors.email = 'Campo obrigatório.'
    if (!values.pass) errors.pass = 'Campo obrigatório.'
    return errors
  }
  
  const onSubmitHandler = (values, { setSubmitting }) => {
    login('credentials', {
      redirect: false,
      username: values.email,
      password: values.pass
    }).then((res) => {
      if (res.status == 200) {
        return fetch('/api/users/me')
        .then(res => res.json())
        .then(user => {
          signIn(user)
          if (!router.query.redirect) return router.push('/produtos')
          router.push(router.query.redirect)
        })
      }
      
      setSubmitting(false)
      setError(true)
      toast.error('Credenciais errada!!')
    })
  }
  
  useEffect(() => {
    if (!loading && user) router.push('/produtos')
  }, [loading])
  
  if (loading || user) return (
    <div className="flex justify-center items-center h-screen">
      <MdSync className="text-4xl animate-spin" />
    </div>
  )
  
  return (
    <>
      <Head>
        <title>Página de Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="col bg-blue-100 flex justify-center flex-col relative overflow-hidden p-8 md:px-20">
          <div className="md:absolute left-15 top-4">
            <Image src={Logo} />
          </div>
          <Image src={LoginPageImg} />
        </div>
      
        <div className="col flex items-center px-4 md:px-16 2xl:px-52 w-full py-16">
          <LoginCard
            validate={validate}
            onSubmitHandler={onSubmitHandler}
            error={error}
          />
        </div>
      </div>
    </>
  )
}