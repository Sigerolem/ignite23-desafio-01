import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'
import { useState } from 'react'

interface TaskProps {
  taskData: {
    id: number,
    task: string,
    done: boolean
  },
  onDeleteTask: (taskId: number) => void;
  onCheckTask: (tasId: number, newState: boolean) => void;
}

export function Task({ taskData, onDeleteTask, onCheckTask }: TaskProps) {
  const [isMouseOverUnchecked, setIsMouseOverUchecked] = useState(false)
  return (
    <div className={styles.task} >
      {
        taskData.done ?
          <CheckCircle
            className={styles.checkedIcon}
            onClick={() => { onCheckTask(taskData.id, !taskData.done) }}
            weight={'fill'}
          />
          :
          <Circle
            className={styles.uncheckedIcon}
            onClick={() => { onCheckTask(taskData.id, !taskData.done) }}
            onMouseOver={() => { setIsMouseOverUchecked(true) }}
            onMouseLeave={() => { setIsMouseOverUchecked(false) }}
            weight={isMouseOverUnchecked ? 'duotone' : 'regular'}
          />
      }

      <p className={taskData.done ? styles.doneTask : ''}>{taskData.task}</p>

      <Trash
        onClick={() => { onDeleteTask(taskData.id) }}
        className={taskData.done ? styles.doneTaskTrash : styles.trashIcon}
        size={14}
        weight={'bold'}
      />
    </div>
  )
}