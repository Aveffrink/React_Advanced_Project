import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        label: { color: "green.700" },
        control: {
          borderColor: "green.700",
          _checked: {
            bg: "green.700",
            borderColor: "green.700",
            _hover: {
              bg: "green.700",
              borderColor: "green.700",
            },
          },
          _indeterminate: {
            bg: "green.700",
            borderColor: "green.700",
          },
        },
      },
    },
  },
});

export default customTheme;
