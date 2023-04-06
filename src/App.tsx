import { ChangeEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'

import { Header } from './components/Header'
import { Task } from './components/Task'

import './global.css'
import styles from './App.module.css'

interface Task {
  id: number,
  task: string,
  done: boolean
}

function App() {
  const [tasks, setTasks] = useState([] as Task[])
  const [newTaskText, setNewTaskText] = useState('')



  function handleCreateTask() {
    let newTaskId = 1
    if (tasks.length > 0) {
      newTaskId = tasks[tasks.length - 1]?.id + 1
    }
    setTasks(prev => (
      [...prev, {
        id: newTaskId,
        task: newTaskText,
        done: false
      }]
    ))
    setNewTaskText('')
  }

  function handleDeleteTask(taskId: number) {
    setTasks(prev => prev.filter(task => (task.id !== taskId)))
  }

  function handleCheckTask(taskId: number, newState: boolean) {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, done: newState }
      } else {
        return task
      }
    }))
  }

  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder='Adicione uma tarefa' value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
          <button onClick={handleCreateTask} disabled={newTaskText === ''} >
            Criar
            <PlusCircle size={16} weight='bold' />
          </button>
        </div>

        <div className={styles.tasksWrapper} >
          <header className={styles.tasksHeader} >
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
            <p>Concluídas</p>
            <span>{tasks.reduce((acc, curTask) => (curTask.done ? acc + 1 : acc), 0)} de {tasks.length}</span>
          </header>

          <div className={styles.taskList} >
            {
              tasks.length > 0 ?
                tasks.map(task => (
                  <Task key={task.id} taskData={task} onDeleteTask={handleDeleteTask} onCheckTask={handleCheckTask} />
                )) :
                <div className={styles.noTasksInfo} >
                  <img src="/src/assets/clipboard.svg" alt="Wireframe de um clipboard" />
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
            }

          </div>
        </div>

      </main>
    </>
  )
}

export default App
