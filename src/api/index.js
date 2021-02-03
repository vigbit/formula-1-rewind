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

export const fetchQualifyingData = async (raceRound, raceYear) => {
    
    try {
        const {data: { MRData: {RaceTable: {Races}}}} = await axios.get(`${url}/${raceYear}/${raceRound}/qualifying.json`);
        
        const modifiedData = Races[0].QualifyingResults.map((raceData) => ({

            familyName: raceData.Driver.familyName,
            givenName: raceData.Driver.givenName,
            nationality: raceData.Driver.nationality,
            permanentNumber: raceData.Driver.permanentNumber,
            code: raceData.Driver.code,
            Q1: raceData.Q1,
            Q2: raceData.Q2,
            Q3: raceData.Q3,
            position: raceData.position,
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchResultsData = async (raceRound, raceYear) => {
    try {
        const {data: { MRData: {RaceTable: {Races}}}} = await axios.get(`${url}/${raceYear}/${raceRound}/results.json`);
        
        const modifiedData = Races[0].Results.map((raceData) => ({

            familyName: raceData.Driver.familyName,
            givenName: raceData.Driver.givenName,
            nationality: raceData.Driver.nationality,
            permanentNumber: raceData.Driver.permanentNumber,
            code: raceData.Driver.code,
            fastestLap: raceData.FastestLap.Time.time,
            position: raceData.position,
            grid: raceData.grid,
            points: raceData.points,
            laps: raceData.laps,
            status: raceData.status,
            time: raceData.Time,
            
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchConstructorsData = async (raceRound, raceYear) => {
    try {
        const {data: {MRData: { StandingsTable: { StandingsLists} }}} = await axios.get(`${url}/${raceYear}/${raceRound}/constructorStandings.json`);

        const modifiedData = StandingsLists[0].ConstructorStandings.map( (data) => ({
            name: data.Constructor.name,
            points: data.points,
            position: data.position,
            wins: data.wins,
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error)
        
    }
}