import { Checkbox, Flex, Image, Text } from "@mantine/core";

const SplitExpenseEquallyUser = ({
  userName,
  isSelected,
  onToggle,
}: {
  userName: string;
  isSelected: boolean;
  onToggle: () => void;
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      my={10}
      onClick={onToggle}
      sx={{ cursor: "pointer" }}
    >
      <Flex align="center" gap={10}>
        <Image
          width={35}
          height={35}
          radius="xl"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
        />
        <Text>{userName}</Text>
      </Flex>
      <Checkbox checked={isSelected}  defaultChecked/>
    </Flex>
  );
};

export default SplitExpenseEquallyUser;
