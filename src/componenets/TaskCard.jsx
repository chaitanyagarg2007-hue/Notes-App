const TaskCard = ({
  task,
  currentTime,
  onComplete,
  onDelete
}) => {


  const getRemainingTime = () => {

    const difference =
      new Date(task.deadline).getTime() -
      currentTime.getTime()


    if (difference <= 0) {
      return 'Deadline passed'
    }


    const days = Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    )


    const hours = Math.floor(
      (difference /
        (1000 * 60 * 60)) % 24
    )


    const minutes = Math.floor(
      (difference /
        (1000 * 60)) % 60
    )


    const seconds = Math.floor(
      (difference / 1000) % 60
    )


    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    }


    return `${hours}h ${minutes}m ${seconds}s`

  }


  const getStatusStyle = () => {

    if (task.status === 'completed') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    }

    if (task.status === 'failed') {
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    }

    return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'

  }


  return (

    <article
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-2xl
        p-5
        hover:border-zinc-700
        transition
      "
    >


      {/* TOP */}

      <div className="flex justify-between gap-4">

        <div className="min-w-0">

          <h3 className="
            text-xl
            font-semibold
            truncate
          ">
            {task.title}
          </h3>

          <p className="
            text-zinc-400
            text-sm
            mt-1
            line-clamp-2
          ">
            {task.details || 'No description provided.'}
          </p>

        </div>


        {/* STATUS */}

        <span
          className={`
            shrink-0
            h-fit
            px-3
            py-1
            rounded-full
            border
            text-xs
            font-semibold
            uppercase
            ${getStatusStyle()}
          `}
        >

          {task.status}

        </span>

      </div>


      {/* DEADLINE */}

      <div className="
        mt-5
        bg-black/40
        border border-zinc-800
        rounded-xl
        p-4
      ">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs text-zinc-500">
              DEADLINE
            </p>

            <p className="text-sm font-medium mt-1">
              {new Date(
                task.deadline
              ).toLocaleString()}
            </p>

          </div>


          {task.status === 'pending' && (

            <div className="
              text-right
              text-indigo-400
              font-semibold
            ">

              <p className="text-xs text-zinc-500">
                REMAINING
              </p>

              <p className="text-sm">
                {getRemainingTime()}
              </p>

            </div>

          )}

        </div>

      </div>


      {/* ACTIONS */}

      <div className="flex gap-3 mt-4">

        {task.status === 'pending' && (

          <button
            onClick={() =>
              onComplete(task.id)
            }
            className="
              flex-1
              bg-emerald-500
              hover:bg-emerald-400
              text-black
              font-semibold
              py-2
              rounded-lg
              transition
              active:scale-[0.98]
            "
          >

            ✓ Complete

          </button>

        )}


        <button
          onClick={() =>
            onDelete(task.id)
          }
          className="
            px-5
            bg-red-500/10
            text-red-400
            hover:bg-red-500
            hover:text-white
            border border-red-500/20
            py-2
            rounded-lg
            font-semibold
            transition
          "
        >

          Delete

        </button>

      </div>


    </article>

  )

}

export default TaskCard