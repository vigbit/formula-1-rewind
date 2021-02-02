import axios from 'axios';

const url = "http://ergast.com/api/f1";

export const fetchData = async () => {
    try {
        const { data } = await axios.get(`${url}.json`);
        
        return data;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchSeasons = async () => {
    try {
        const { data: { MRData: {SeasonTable: {Seasons}}} } = await axios.get(`${url}/seasons.json?limit=100`);

        const modifiedData = Seasons.map( (seasonsData) => ({
            year: seasonsData.season
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error)
    }
}

export const fetchSeasonData = async () => {
    try {
        const { data } = await axios.get(`${url}/2019.json`);

        // const modifiedData = Seasons.map( (seasonsData) => ({
        //     year: seasonsData.season
        // }))

        return data;
        
    } catch (error) {
        console.log(error)
    }
}