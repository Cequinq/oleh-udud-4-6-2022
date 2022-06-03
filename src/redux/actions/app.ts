import { Dispatch } from 'redux';
import axios from 'axios';
import { Film } from '../reducers/app';

export const SET_IN_STATE = 'app/SET_IN_STATE';
export const SET_FAVORITE_FILM = 'app/SET_FAVORITE_FILM';

export const setInState = (payload: Record<string, any>) => ({
    type: SET_IN_STATE,
    payload,
});

export const setFavoriteFilm = (payload: { film: Film }) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_FAVORITE_FILM,
            payload,
        });
    };
};

export const getFilms = (payload?: { id?: number }) => {
    return (dispatch: Dispatch) => {
        axios
            .get('https://my-json-server.typicode.com/moviedb-tech/movies/list', { params: payload })
            .then((response) => {
                dispatch(setInState({ film: response.data }));
            });
    };
};
