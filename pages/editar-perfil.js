import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Container from '../components/container'
import InputField from '../components/InputField'
import { Formik } from 'formik'
import { MdEdit, MdSync } from 'react-icons/md'
import { useUser } from '../context/userContext'
import { useEffect } from 'react'
import { signIn as login } from 'next-auth/client'
import { useRouter } from 'next/router'
import swal from 'sweetalert'

const EditProfileCard = ({ user, validate, onSubmitHandler }) => (
  <Formik
    enableReinitialize
    initialValues={{ name: user.name, currentEmail: user.email, newEmail: '' }}
    validate={validate}
    onSubmit={onSubmitHandler}
  >
    {({
      values,
      initialStatus,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <div className="shadow-md rounded-xl border-2 rounded-xl p-8 w-96 transition-all duration-500 hover:shadow-xl">
        <form className="mt-10 block" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-6">
            <InputField
              type="text"
              disabled
              name="name"
              label="Nome Completo"
              value={values.name}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputField
              type="email"
              disabled
              name="currentEmail"
              label="Email"
              errors={errors}
              touched={touched}
              value={values.currentEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputField
              type="email"
              name="newEmail"
              label="Email"
              errors={errors}
              touched={touched}
              value={values.newEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex flex-col items-center gap-y-8 mt-8">
            <button type="submit" className="flex items-center gap-x-3 rounded-xl bg-primary px-12 md:px-20 py-2 border-2 border-primary text-white transition-all hover:text-gray-700 hover:bg-transparent">
              Alterar Dados <MdEdit className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    )}
  </Formik>
)

export default function EditProfile() {
  const router = useRouter()
  const { user, setUser, loading } = useUser()
  
  const validate = (values) => {
    const errors = {}
    if (!values.name) errors.name = 'Campo obrigatório.'
    if (!values.currentEmail) errors.currentEmail = 'Campo obrigatório.'
    if (!values.newEmail) errors.newEmail = 'Campo obrigatório.'
    else if (values.newEmail == values.currentEmail) errors.newEmail = 'Campo igual email atual.'
    return errors
  }
  
  const onSubmitHandler = async (values, { resetForm }) => {
    if (user.email != values.currentEmail) return swal('Esse não é o seu email atual.', '', 'warning')
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    if (res.status != 200) return swal('Email já registrado por outro usuario.', '', 'error')
    const updatedUser = await res.json()
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    swal('Seu perfil foi editado com sucesso.', '', 'success')
    resetForm({
      name: updatedUser.name,
      currentEmail: updatedUser.email,
      newEmail: ''
    })
  }
  
  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [loading])
  
  if (loading || !user) return (
    <div className="flex justify-center items-center h-screen">
      <MdSync className="text-4xl animate-spin" />
    </div>
  )
  
  return (
    <>
      <Head>
        <title>Editar Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <Header />
      <Container>
        <div className="pt-6 md:pt-3">
          <Link href="/produtos"><a className="text-red-500 transition-all hover:text-red-300">Pagina Inicial</a></Link> > <span>Editar Perfil</span>
        </div>
        <div className="flex justify-center pt-4 pb-8 md:pt-2">
          <EditProfileCard
            user={user}
            validate={validate}
            onSubmitHandler={onSubmitHandler}
          />
        </div>
      </Container>
    </>
  )
}