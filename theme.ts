import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        p: "2.5", 
      },
      variants: {
        RK_solidRed: {
          bg: "red.600",
          my: '1',
          _text:{
            fontWeight: "bold",
            color: "white"
          }
        },
        RK_outlineRed: {
          _text: {
            color: "red.600",
            fontWeight: "bold",
          },
          borderWidth: "1",
          borderColor: "red.600",
        },
      },
    },
    Input: {
      baseStyle: {
        borderColor: "muted.400",
        p: "10px",
      }
    },
    FormControlLabel: {
      baseStyle: {
        marginBottom: "6px",
        _text:{
          color: 'coolGray.800',
          fontSize: 'sm',
          fontWeight: "bold"
        }
      }
    },
    FormControlHelperText: {
      baseStyle: {
        alignSelf: "flex-end",
        _text: {
          fontSize: "xs"
        }
      }
    },
    FormControlErrorMessage: {
      baseStyle: {
        alignSelf: "flex-end"
      }
    },
    Toast: {
      baseStyle: {
        p: "1.5",
        _title: {
          fontSize: "14"
        },
        _description: {
          fontSize: "12"
        },
      },
      defaultProps: {
        duration: 2300
      }
    }
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default customTheme