import axios from "axios";


export default class BerryServices {
    async getBerries(): Promise<any> {
        const response = await axios.get("https://pokeapi.co/api/v2/berry/")
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response.results;
    }

    async getBerry(id: number): Promise<any> {
        const response = await axios.get(`https://pokeapi.co/api/v2/berry/${id}`)
        .then((response) => response.data)
        .catch((error) => console.log(error)); 
        return response.data;
    }

    async getBerryByName(name: string): Promise<any> {
        const response = await axios.get(`https://pokeapi.co/api/v2/berry/${name}`)
        .then((response) => response.data)
        .catch((error) => console.log(error)); 
        return response.data;
    }

    // get random berry
    async getRandomBerry(): Promise<any> {
        // choose random id between 1 and 68
        const randomId = Math.floor(Math.random() * 68) + 1;
        const response = await this.getBerry(randomId);
        return response;
    }

}