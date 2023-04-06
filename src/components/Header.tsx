import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header} >
      <img src="/src/assets/todo-logo.svg" alt="Logo To Do" />
    </header>
  )
}