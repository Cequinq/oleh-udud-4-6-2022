import { AnyAction } from 'redux';
import { SET_FAVORITE_FILM, SET_IN_STATE } from '../actions/app';

export type Film = {
    id?: number;
    name?: string;
    img?: string;
    description?: string;
    year?: string;
    genres?: string[];
    director?: string;
    starring?: string[];
};

interface ReducerState {
    film: Film[];
    favorite: Film[];
    selectedFilm: any;
}

const initialState: ReducerState = {
    film: [],
    favorite: [],
    selectedFilm: undefined,
};

const reducer = (state: ReducerState = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_IN_STATE:
            return { ...state, ...action.payload };
        case SET_FAVORITE_FILM: {
            if (state.favorite!.some((m) => m.id === action.payload.film.id)) {
                return {
                    ...state,
                    favorite: state.favorite!.filter((m) => m.id !== action.payload.film.id),
                };
            } else {
                return {
                    ...state,
                    favorite: [...state.favorite, action.payload.film],
                };
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;
