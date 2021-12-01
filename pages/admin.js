import AdminLayout from "../components/adminLayout"
import { AiOutlineLineChart } from 'react-icons/ai'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'

export default function Admin() {
  return (
    <AdminLayout>
      <div className="grid gap-x-3 gap-y-5 md:grid-cols-4 py-4 mb-4">
        <div className="hover:shadow-lg flex justify-center flex items-center shadow-md transition-all bg-blue-200 rounded py-20 h-70">
          <AiOutlineLineChart className="text-4xl" /> 0
        </div>
        <div className="hover:shadow-lg shadow-md transition-all items-center  bg-red-200 rounded py-20 flex justify-center h-60">
          <AiOutlineLineChart className="text-4xl" /> Usuarios 0
        </div>
        <div className="hover:shadow-lg shadow-md transition-all items-center  bg-yellow-200 rounded py-20 flex justify-center h-60">
          <AiOutlineLineChart className="text-4xl" /> Total de Pedidos 0
        </div>
        <div className="hover:shadow-lg shadow-md transition-all  items-center bg-green-200 rounded py-20 flex justify-center h-60">
          <AiOutlineLineChart className="text-4xl" /> Total de vendas 0
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-4 gap-y-8">
        <div className="rounded px-6 py-4 shadow-md bg-white col-span-2">
          <div className="">
            <div className="flex flex-col gap-y-3">
              <span className="block text-gray-800 text-3xl font-medium">Gráfico</span>
              <div className="flex items-center gap-x-3 mb-2">
                <span className="block text-gray-700 font-medium text-xl">Vendas de</span>
                <select>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
          </div>
          <Line data={{
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
              fill: {
                target: 'origin',
                below: 'rgb(0, 0, 255)'
              },
              label: '# Vendas de 2021',
              data: [120, 60, 130, 120, 20, 50, 100, 250, 120, 30, 200, 300],
              backgroundColor: [
                '#ee6e73',
                '#1976d2'
              ],
            }]
          }} />
        </div>
        <div className="rounded px-6 py-4 shadow-md bg-white col-span-2">
          <div className="">
            <div className="flex flex-col gap-y-3">
              <span className="block text-gray-800 text-3xl font-medium">Gráfico</span>
              <div className="flex items-center gap-x-3 mb-2">
                <span className="block text-gray-700 font-medium text-xl">Comparativo de vendas</span>
                <select>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </select>
                <select>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
          </div>
          <Line data={{
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
              label: '# Vendas ano 2019',
              data: [220, 60, 130, 90, 20, 50, 60, 80, 120, 110, 200, 300],
              backgroundColor: [
                '#ee6e73',
              ],
            }, {
              label: '# Vendas ano 2021',
              data: [120, 40, 180, 120, 30, 50, 100, 250, 120, 30, 234, 270],
              backgroundColor: [
                '#1976d2'
              ],
            }]
          }} />
        </div>
      </div>
      
      <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full hidden">
        <div className="absolute bg-white w-1/2 rounded">
          <span>ds</span>
          <ul>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}