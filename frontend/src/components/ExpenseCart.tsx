import { Flex, Image, Text } from '@mantine/core'
import { useState } from 'react'
import ExpenseDetail from './ExpenseDetail'
import { getMonth, getMonthString } from '../utils/dates'

const ExpenseCart = ({data,userId}:any) => {

  const [open,setOpen] = useState<boolean>(false)
  return (
    <Flex align="center" justify="space-between" style={{cursor:"pointer"}} w={500} onClick={() => setOpen(true)}>
        <Flex align="center" gap={20}>
        <Flex direction="column" align="center">
            <Text size='sm' style={{lineHeight:"13px"}}>{getMonthString(data.createDate)}</Text>
            <Text size='sm' style={{lineHeight:"13px"}}>{getMonth(data.createDate)}</Text>
        </Flex>
        <Image w={40} style={{borderRadius:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"/>
       <Text ml={35}>{data.description}</Text>
        </Flex>
        <Text>${data.amount}</Text>
        <ExpenseDetail open={open} setOpen={setOpen} data={data}/>
    </Flex>
  )
}

export default ExpenseCart