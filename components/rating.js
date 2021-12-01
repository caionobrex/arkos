import { AiOutlineSearch, AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function Rating({ rating }) {
  const rate = new Array(5).fill(5)
  
  return (
    <ul className="flex items-center gap-x-1">
      {rate.map((rate, i) => (
        <li key={i}>{i >= rating.rate ? <AiOutlineStar className="text-yellow-300" /> : <AiFillStar className="text-yellow-300" />}</li>
      ))}
      <li className="text-gray-300 ml-2">({rating.count} reviews)</li>
    </ul>
  )
}