import Head from 'next/head'
import Image from 'next/image'

// essa routa apenas redireciona o usuario para /produtos

export default function Home() { return null }

export function getServerSideProps() {
  return { redirect: { destination: '/produtos' } }
}