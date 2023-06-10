import { createTheme } from "@mui/material/styles";
import { light } from "@mui/material/styles/createPalette";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    mode: light,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: grey[900],
                    color: "#FFFFFF",
                    flexShrink: 0,
                },
                root: {
                    flexShrink: 0,
                    width: 240,
                }
            }
        }
    }
})

export default theme;