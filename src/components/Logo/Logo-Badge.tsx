type LogoBadgeProps = {
  label: 'Pre-alpha' | 'Alpha' | 'Beta'
}

const LogoBadge: React.FC<LogoBadgeProps> = ({ label }: LogoBadgeProps) => {
  return (
    <div className="bg-gray-100 px-2 py-1 rounded-md max-w-max flex items-center cursor-default">
      <span className="font-medium text-gray-700 text-xs">{label}</span>
    </div>
  )
}

export type { LogoBadgeProps }
export { LogoBadge }
