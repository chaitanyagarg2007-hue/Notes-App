import { useEffect, useState } from 'react'
import TaskForm from './componenets/TaskForm'
import TaskCard from './componenets/TaskCard'
import Stats from './componenets/Stats'

const App = () => {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks')

    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [search, setSearch] = useState('')

  // Used only to make countdown update every second
  const [currentTime, setCurrentTime] = useState(new Date())


  // Save tasks in localStorage whenever tasks change
  useEffect(() => {

    localStorage.setItem(
      'taskflow-tasks',
      JSON.stringify(tasks)
    )

  }, [tasks])


  // Update current time every second
  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)

  }, [])


  // Ask permission for browser notifications
  useEffect(() => {

    if (
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      Notification.requestPermission()
    }

  }, [])


  // Check deadlines
  useEffect(() => {

    const checkDeadlines = () => {

      const now = new Date()

      setTasks(prevTasks => {

        let hasChanges = false

        const updatedTasks = prevTasks.map(task => {

          // Already completed → don't touch it
          if (task.status === 'completed') {
            return task
          }


          const deadline = new Date(task.deadline)


          // Deadline passed
          if (
            now > deadline &&
            task.status !== 'failed'
          ) {

            hasChanges = true

            return {
              ...task,
              status: 'failed'
            }
          }


          return task
        })


        return hasChanges
          ? updatedTasks
          : prevTasks

      })


      // Notifications
      tasks.forEach(task => {

        if (task.status !== 'pending') {
          return
        }


        const deadline = new Date(task.deadline)

        const difference =
          deadline.getTime() - now.getTime()


        const oneDay =
          24 * 60 * 60 * 1000


        // Deadline within next 24 hours
        if (
          difference > 0 &&
          difference <= oneDay &&
          !task.oneDayNotification
        ) {

          if (Notification.permission === 'granted') {

            new Notification(
              'Deadline Tomorrow ⚠️',
              {
                body: `"${task.title}" is due within 24 hours.`
              }
            )

          }


          setTasks(prevTasks =>
            prevTasks.map(item =>
              item.id === task.id
                ? {
                    ...item,
                    oneDayNotification: true
                  }
                : item
            )
          )

        }


        // Deadline is today
        const sameDay =
          now.getFullYear() === deadline.getFullYear() &&
          now.getMonth() === deadline.getMonth() &&
          now.getDate() === deadline.getDate()


        if (
          sameDay &&
          difference > 0 &&
          !task.deadlineNotification
        ) {

          if (Notification.permission === 'granted') {

            new Notification(
              'Deadline Today 🚨',
              {
                body: `"${task.title}" is due today!`
              }
            )

          }


          setTasks(prevTasks =>
            prevTasks.map(item =>
              item.id === task.id
                ? {
                    ...item,
                    deadlineNotification: true
                  }
                : item
            )
          )

        }

      })

    }


    checkDeadlines()

    const interval = setInterval(
      checkDeadlines,
      60000
    )


    return () => clearInterval(interval)

  }, [tasks])


  // Add new task
  const addTask = (title, details, deadline) => {

    const newTask = {

      id: Date.now(),

      title,

      details,

      deadline,

      status: 'pending',

      oneDayNotification: false,

      deadlineNotification: false,

      createdAt: new Date().toISOString()

    }


    setTasks(prevTasks => [
      ...prevTasks,
      newTask
    ])

  }


  // Complete task
  const completeTask = (id) => {

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              status: 'completed',
              completedAt: new Date().toISOString()
            }
          : task
      )
    )

  }


  // Delete task
  const deleteTask = (id) => {

    setTasks(prevTasks =>
      prevTasks.filter(
        task => task.id !== id
      )
    )

  }


  // Search
  const filteredTasks = tasks.filter(task => {

    const searchText =
      search.toLowerCase()

    return (
      task.title
        .toLowerCase()
        .includes(searchText) ||

      task.details
        .toLowerCase()
        .includes(searchText)
    )

  })


  return (

    <div className="min-h-screen bg-[#09090b] text-white">

      <div className="max-w-7xl mx-auto px-5 py-8 lg:px-8">


        {/* HEADER */}

        <header className="mb-8">

          <div className="flex flex-col gap-2">

            <p className="text-sm font-semibold text-indigo-400">
              PRODUCTIVITY DASHBOARD
            </p>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              TaskFlow
            </h1>

            <p className="text-zinc-400">
              Organize your work. Track your deadlines.
            </p>

          </div>

        </header>


        {/* STATS */}

        <Stats tasks={tasks} />


        {/* MAIN CONTENT */}

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 mt-8">


          {/* LEFT SIDE */}

          <TaskForm onAddTask={addTask} />


          {/* RIGHT SIDE */}

          <section>


            {/* SEARCH */}

            <div className="mb-5">

              <input
                type="text"
                placeholder="Search your tasks..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  bg-zinc-900
                  border border-zinc-800
                  rounded-xl
                  px-4 py-3
                  outline-none
                  placeholder:text-zinc-600
                  focus:border-indigo-500
                  transition
                "
              />

            </div>


            {/* TASK LIST */}

            <div className="flex flex-col gap-4">

              {filteredTasks.length === 0 && (

                <div className="
                  border border-dashed
                  border-zinc-800
                  rounded-2xl
                  py-16
                  text-center
                  text-zinc-500
                ">

                  <p className="text-lg">
                    No tasks found
                  </p>

                  <p className="text-sm mt-1">
                    Create a task or try another search.
                  </p>

                </div>

              )}


              {filteredTasks.map(task => (

                <TaskCard
                  key={task.id}
                  task={task}
                  currentTime={currentTime}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />

              ))}

            </div>

          </section>

        </div>

      </div>

    </div>

  )

}

export default App