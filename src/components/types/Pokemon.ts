export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
    abilities: Ability[];
}