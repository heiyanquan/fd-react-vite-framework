import { FC, useMemo, useState } from 'react'
import { Button, Space, Table, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'

const HomePage: FC = () => {
  const navigate = useNavigate()

  const [data, setdata] = useState(
    new Array(500)
      .fill({
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      })
      .map((item, index) => ({
        ...item,
        name: `${item.name}${index}`
      }))
  )
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address'
      },
      {
        title: 'Tags',
        dataIndex: 'tags'
      }
    ],
    []
  )

  const toPage = () => {
    navigate('/router?user=name1', {
      state: {
        params: {
          id: 1
        }
      }
    })
  }

  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={toPage}>
          to router
        </Button>
      </Space>
      <Flex gap={54}>
        <table>
          <thead>
            <tr>
              {columns.map((item) => (
                <td key={item.title}>{item.title}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Table
          rowSelection={{
            type: 'checkbox'
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="name"></Table>
      </Flex>
    </>
  )
}

export default HomePage
