import React from 'react';

import Drawer from './components/Drawer/Drawer';

import { fetchData, fetchSeasons } from './api'

class App extends React.Component{

    async componentDidMount(){
        const fetchedData = await fetchData();

        console.log(fetchedData);
    }

    render(){
        return(
            <div>
                <Drawer />
            </div>
        )
    }
}

export default App;