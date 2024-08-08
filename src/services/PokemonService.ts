import axios from 'axios';
import { Pokemon } from '../components/types/Pokemon';

export default class PokemonService {
    public static async getPokemonByName(name: string): Promise<Pokemon> {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response;
    }

    public static async getPokemonById(id: number): Promise<Pokemon> {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response;
    }

    public static async getPokemonList(offset: number, limit: number): Promise<Pokemon[]> {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response;
    }

    public static async getPokemonTypes(): Promise<any> {
        const response = await axios.get('https://pokeapi.co/api/v2/type')
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response;
    }

    public static async getPokemonAbilities(): Promise<any> {
        const response = await axios.get('https://pokeapi.co/api/v2/ability')
        .then((response) => response.data)
        .catch((error) => console.log(error));
        return response;
    }
}