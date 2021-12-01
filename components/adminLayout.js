import Link from 'next/link'
import { MdExitToApp, MdMenu, MdNotifications } from "react-icons/md"
import { AiOutlineDashboard, AiOutlineUser, AiFillTags, AiFillFileImage, AiOutlineQuestion, AiFillLock } from 'react-icons/ai'
import { MdIntegrationInstructions } from 'react-icons/md'
import { FaProductHunt } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'
import { IoIosPaper } from 'react-icons/io'
import { BiCategory } from 'react-icons/bi'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import swal from 'sweetalert'

const SideNav = ({ router }) => (
  <div className="hidden min-h-screen shadow py-8 md:block" style={{ width: '18%' }}>
    <div className="flex flex-col items-center mb-4 pb-2">
      <img src="https://portfolio-mauve-delta.vercel.app/images/avatar.jpg" className="rounded-full" />
      <span className="mt-2 font-medium text-gray-800">Caio Nobre</span>
      <span className="font-medium text-sm text-gray-600">Developer</span>
      <span className="font-medium text-sm text-red-400 mt-1 underline flex items-center gap-x-1 cursor-pointer" onClick={() => swal({ title: 'Deseja mesmo sair ?', icon: 'warning', dangerMode: true, buttons: ['NÃO', 'SIM'] })}>
        sair <MdExitToApp className="cursor-pointer" />
      </span>
    </div>

    <ul className="flex flex-col">
      <li className="">
        <Link href="/admin/">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin' ? 'bg-gray-100' : ''}`}>
            <AiOutlineDashboard className="text-2xl text-primary-lighter" /><span className="border-b">DashBoard</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/orders">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/orders' ? 'bg-gray-100' : ''}`}>
            <AiFillTags className="text-2xl text-primary-lighter" /><span className="border-b">Pedidos</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/duvidas">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/duvidas' ? 'bg-gray-100' : ''}`}>
            <AiOutlineQuestion className="text-2xl text-primary-lighter" /><span className="border-b">Dúvidas</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/medias">
          <a href="/medias" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/medias' ? 'bg-gray-100' : ''}`}>
            <AiFillFileImage className="text-2xl text-primary-lighter" /><span className="border-b">Medias</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/products">
          <a href="/products" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/products' ? 'bg-gray-100' : ''}`}>
            <FaProductHunt className="text-2xl text-primary-lighter" /><span className="border-b">Produtos</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/departaments">
          <a href="/admin/departaments" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/departaments' ? 'bg-gray-100' : ''}`}>
            <BiCategory className="text-2xl text-primary-lighter" /><span className="border-b">Departamentos</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/users">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/users' ? 'bg-gray-100' : ''}`}>
            <AiOutlineUser className="text-2xl text-primary-lighter" /><span className="border-b">Usuários</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/roles">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/roles' ? 'bg-gray-100' : ''}`}>
            <AiFillLock className="text-2xl text-primary-lighter" /><span className="border-b">Funções</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/coupons">
          <a href="/admin/coupons" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/coupons' ? 'bg-gray-100' : ''}`}>
            <IoIosPaper className="text-2xl text-primary-lighter" /><span className="border-b">Cupons</span>
          </a>
        </Link>
      </li>
      <li className="">
        <Link href="/admin/site">
          <a href="" className={`flex items-center gap-x-3 px-8 py-6 font-medium text-gray-800 border-b cursor-pointer ${router.pathname == '/admin/site' ? 'bg-gray-100' : ''}`}>
            <CgWebsite className="text-2xl text-primary-lighter" /><span className="border-b">Site</span>
          </a>
        </Link>
      </li>
    </ul>
  </div>
)

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [session, loading] = useSession()

  return (
    <div className="flex">
      <SideNav router={router} />

      <main className="flex-1 bg-gray-100">
        <div className="flex items-center justify-between px-8 text-white bg-primary py-5 shadow-md">
          <div className="text-2xl font-semibold">
            {/* Logo */}
          </div>
          <div className="flex items-center gap-x-3">
            <MdNotifications className="text-3xl cursor-pointer md:text-2xl" />
            <MdMenu className="text-3xl cursor-pointer md:text-2xl" />
            {/* Sair */}
          </div>
        </div>

        <div className="px-8 pt-6 pb-24">{children}</div>
      </main>

      <style jsx>{`
        ul li {
          position: relative;
        }
        ul li::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          transition: all 0.4s ease-out;
          background-color: rgb(243, 244, 246);
          z-index: -1;
        }
        ul li:hover::before {
          width: 100%;
        }
      `}</style>
    </div>
  )
}