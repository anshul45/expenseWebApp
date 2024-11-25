import { Flex, Image, Text } from '@mantine/core';

const Logo =  ({img,text}:any) => {
 
  return (
    <Flex align="center" direction="column">
    <Image radius={100} w={80} src={img}/>
    <Text size="xl">{text}</Text>
   </Flex>
  )
}

export default Logo