import { InputHTMLAttributes } from 'react'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="border p-2 rounded" {...props} />
    </div>
  )
}
