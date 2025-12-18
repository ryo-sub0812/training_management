import { ChangeEvent, FocusEvent, memo, VFC } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

type Props = {
  name: string
  type: string
  handleChange: {
    (e: ChangeEvent<any>): void
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void
  }
  handleBlur: {
    (e: FocusEvent<any>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  value: string
  placeholder: string
  children: string | null
}

export const CustomForm: VFC<Props> = memo((props) => {
  const { name, type, handleChange, handleBlur, value, placeholder, children } =
    props
  return (
    <FormControl>
      <FormLabel
        fontSize="sm"
        fontWeight="bold"
        color="gray.700"
        _dark={{ color: 'gray.300' }}
        mb={2}
      >
        {children}
      </FormLabel>
      <Input
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        bg="white"
        borderWidth="2px"
        borderColor="gray.300"
        _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
        borderRadius="xl"
        px={4}
        py={3}
        fontSize="md"
        placeholder={placeholder}
        _focus={{
          borderColor: 'purple.400',
          _dark: { borderColor: 'purple.500' },
          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
        }}
        _hover={{
          borderColor: 'purple.300',
          _dark: { borderColor: 'purple.600' },
        }}
        transition="all 0.2s"
        data-testid={name + '-form'}
      />
    </FormControl>
  )
})
