import toast, { Toaster, ToasterProps } from 'react-hot-toast'

type ToastProps = ToasterProps

const Toast: React.FC<ToastProps> = ({ ...rest }: ToastProps) => {
  return (
    <Toaster
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 6000,
        position: 'top-right',
        className: 'text-sm'
      }}
      {...rest}
    />
  )
}

export { Toast, toast }
