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

export const fetchSeasonData = async (year) => {
    let getYear = '2020';
    if(year){
        getYear = year; 
    }

    try {
        
        const { data: { MRData: {RaceTable: {Races}}} } = await axios.get(`${url}/${getYear}.json`);
        const modifiedData = Races.map( (racesData) => ({
            country: racesData.Circuit.Location.country,
            circuitName: racesData.Circuit.circuitName,
            raceName: racesData.raceName,
            round: racesData.round,
            date: racesData.date,
            season: racesData.season,
        }))

        console.log(year)

        return modifiedData;
  
    } catch (error) {
        console.log(error)
    }
}