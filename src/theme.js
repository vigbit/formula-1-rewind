import { createMuiTheme } from '@material-ui/core'
import { deepPurple, amber } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f44336",
            
        },
        secondary: {
            main: "#fff176",
            contrastText: "#fffde7",
        }
    }

});

export default theme;