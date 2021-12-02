import Logo from '../public/imgs/logo.svg'
import Container from './container'
import Image from 'next/image'
import Link from 'next/link'
import { BsCart } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineDashboard } from 'react-icons/ai'
import { MdExitToApp, MdLogin } from 'react-icons/md'
import { useUser } from '../context/userContext'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/cartContext'
import { useRouter } from 'next/router'
import swal from 'sweetalert'

const variants = {
  open: { height: 'auto', opacity: 1 },
  closed: { height: 0, opacity: 0 }
}

const CartIcon = ({ items }) => (
  <Link href="/meu-carrinho">
    <a className="relative">
      <BsCart className="text-2xl text-gray-600 cursor-pointer" />
      <span className="absolute -top-4 -right-2 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-white text-sm">
        {items.length}
      </span>
    </a>
  </Link>
)

const DropDown = ({ isOpen, setIsOpen, signOut, user, onClick }) => (
  <div
    className="relative"
    onClick={() => setIsOpen(true)}
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    {!user ? (
        <Link href="/login"><a className="text-primary-lighter text-lg flex items-center gap-x-1 underline transition-all hover:text-primary">
          Entrar <MdLogin  /></a>
        </Link>
      ) : (
        <>
          <span>Olá, <span className="text-primary font-medium cursor-pointer">{user.name}!</span></span>
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            className="absolute opacity-0 overflow-hidden rounded flex flex-col bg-primary text-white top-full shadow-md w-full"
            style={{ minWidth: '160px', zIndex: 1000 }}
          >
            <ul className="flex flex-col">
              <li className="flex items-center gap-x-3 px-3 py-4 border-b transition-all duration-400 border-primary-lighter hover:bg-primary-lighter">
                <AiOutlineUser className="text-xl" />
                <Link href="/editar-perfil">Editar Perfil</Link>
              </li>
              <li className="flex items-center gap-x-3 px-3 py-4 border-b transition-all duration-400 border-primary-lighter hover:bg-primary-lighter">
                <AiOutlineDashboard className="text-xl" />
                <Link href="/admin">DashBoard</Link>
              </li>
              <li className="flex items-center gap-x-3 px-3 py-4 transition-all cursor-pointer duration-400 hover:bg-primary-lighter" onClick={onClick}>
                <MdExitToApp className="text-xl" />
                <button>Sair</button>
              </li>
            </ul>
          </motion.div>
        </>
    )}
  </div>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useUser()
  const { items } = useCart()
  const router = useRouter()
  
  const onClickHandler = () => {
    swal({
      title: 'Você deseja mesmo sair ?',
      icon: 'warning',
      buttons: ['NÃO', 'SIM'],
      dangerMode: true
    }).then((willLeave) => {
      if (willLeave) {
        signOut()
        router.push('/produtos')
      }
    })
  }
  
  return (
    <header className="md:border-none">
      <Container>
        <div className="flex flex-col items-center gap-y-3 md:flex-row justify-between py-2">
          <Link href="/produtos">
            <a>
              <Image src="/imgs/logo.svg" width="210px" height="77px" />
            </a>
          </Link>
          
          <div className="flex items-center gap-x-3">
            <CartIcon items={items} />
            <DropDown
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              signOut={signOut}
              user={user}
              onClick={onClickHandler}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}