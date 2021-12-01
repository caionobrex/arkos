export default function InputField(props) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <label>{props.label}</label>
        <span className="text-red-500">{props.errors[props.name] && props.touched[props.name] && props.errors[props.name]}</span>
      </div>
      <input
        {...props}
        className="border-2 rounded-xl px-3 duration-500 py-2 outline-none transition-all focus:border-primary"
      />
    </div>
  )
}