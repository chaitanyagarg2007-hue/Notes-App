const Stats = ({ tasks }) => {

  const total = tasks.length

  const pending = tasks.filter(
    task => task.status === 'pending'
  ).length

  const completed = tasks.filter(
    task => task.status === 'completed'
  ).length

  const failed = tasks.filter(
    task => task.status === 'failed'
  ).length


  const stats = [
    {
      label: 'Total',
      value: total
    },
    {
      label: 'Pending',
      value: pending
    },
    {
      label: 'Completed',
      value: completed
    },
    {
      label: 'Failed',
      value: failed
    }
  ]


  return (

    <div className="
      grid
      grid-cols-2
      lg:grid-cols-4
      gap-4
    ">

      {stats.map(stat => (

        <div
          key={stat.label}
          className="
            bg-zinc-900
            border border-zinc-800
            rounded-2xl
            p-5
          "
        >

          <p className="text-sm text-zinc-500">
            {stat.label}
          </p>

          <p className="text-3xl font-bold mt-1">
            {stat.value}
          </p>

        </div>

      ))}

    </div>

  )

}

export default Stats