import React, { useState } from 'react'
import { TasksProvider, useTasksDispatch, useTasks } from './TasksContext'
import { Input, Button, Checkbox, Space, Row, Col } from 'antd'

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useTasksDispatch()
  let taskContent
  if (isEditing) {
    taskContent = (
      <>
        <Input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            })
          }}
        />
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </>
    )
  } else {
    taskContent = (
      <>
        {task.text}
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </>
    )
  }
  return (
    <Space>
      <Checkbox
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          })
        }}
      />
      {taskContent}
      <Button
        onClick={() => {
          dispatch({
            type: 'deleted',
            id: task.id
          })
        }}>
        Delete
      </Button>
    </Space>
  )
}
function TaskList() {
  const tasks = useTasks()
  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
        <Col key={task.id} span={24}>
          <Task task={task} />
        </Col>
      ))}
    </Row>
  )
}

let nextId = 3
function AddTask() {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatch()
  return (
    <>
      <Input placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
      <br />
      <Button
        onClick={() => {
          setText('')
          dispatch({
            type: 'added',
            id: nextId++,
            text: text
          })
        }}>
        Add
      </Button>
    </>
  )
}

const ReducerPage: React.FC = () => {
  return (
    <>
      <TasksProvider>
        <h1>useReducer和useContext结合</h1>
        <AddTask />
        <br />
        <TaskList />
      </TasksProvider>
    </>
  )
}

export default ReducerPage
