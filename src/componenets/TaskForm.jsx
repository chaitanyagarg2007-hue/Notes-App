import { useState } from 'react'

const TaskForm = ({ onAddTask }) => {

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [deadline, setDeadline] = useState('')


  const submitHandler = (e) => {

    e.preventDefault()


    if (!title.trim() || !deadline) {
      return
    }


    onAddTask(
      title,
      details,
      deadline
    )


    setTitle('')
    setDetails('')
    setDeadline('')

  }


  return (

    <form
      onSubmit={submitHandler}
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-2xl
        p-6
        h-fit
        lg:sticky
        lg:top-6
      "
    >

      <div className="mb-6">

        <p className="text-indigo-400 text-sm font-semibold">
          NEW TASK
        </p>

        <h2 className="text-2xl font-bold mt-1">
          Create a task
        </h2>

      </div>


      {/* TITLE */}

      <div className="mb-4">

        <label className="text-sm text-zinc-400">
          Title
        </label>

        <input
          type="text"
          placeholder="e.g. Complete React project"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-lg
            px-4 py-3
            mt-2
            outline-none
            focus:border-indigo-500
          "
        />

      </div>


      {/* DETAILS */}

      <div className="mb-4">

        <label className="text-sm text-zinc-400">
          Details
        </label>

        <textarea
          placeholder="Add some details..."
          value={details}
          onChange={(e) =>
            setDetails(e.target.value)
          }
          className="
            w-full
            h-28
            resize-none
            bg-zinc-800
            border border-zinc-700
            rounded-lg
            px-4 py-3
            mt-2
            outline-none
            focus:border-indigo-500
          "
        />

      </div>


      {/* DEADLINE */}

      <div className="mb-6">

        <label className="text-sm text-zinc-400">
          Deadline
        </label>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-lg
            px-4 py-3
            mt-2
            outline-none
            focus:border-indigo-500
          "
        />

      </div>


      {/* BUTTON */}

      <button
        type="submit"
        className="
          w-full
          bg-indigo-500
          hover:bg-indigo-400
          text-white
          font-semibold
          py-3
          rounded-lg
          transition
          active:scale-[0.98]
        "
      >

        + Create Task

      </button>

    </form>

  )

}

export default TaskForm