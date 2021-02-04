import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme'

import Drawer from './components/Drawer/Drawer';

import { fetchData, fetchSeasons } from './api'

class App extends React.Component{

    async componentDidMount(){
        const fetchedData = await fetchData();
    }

    render(){
        return(
            <ThemeProvider theme={theme}>
                <Drawer />
            </ThemeProvider>
        )
    }
}

export default App;