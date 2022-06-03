import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/Store';
import { Film } from '../redux/reducers/app';
import { MovieItem, MovieItemDetailed } from '../components';
import { getFilms, setFavoriteFilm } from '../redux/actions/app';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface Props {
    className?: string;
}

const Gallery: FC<Props> = ({ className }) => {
    const dispatch = useAppDispatch();
    const films = useSelector((state: RootState) => state.app.film);
    const favoriteFilms = useSelector((state: RootState) => state.app.favorite);

    const [movieDialog, setMovieDialog] = useState<boolean>(false);
    const [selectedFilm, setSelectedFilm] = useState<Film>();

    const setDialog = (id: number) => {
        setMovieDialog(true);
        setSelectedFilm(films?.find((film: Film) => film.id === id));
    };

    useEffect(() => {
        dispatch(getFilms({}));
    }, []);

    return (
        <div className={className}>
            <Typography marginBottom={4} variant="h4" align="center">
                Movies Gallery
            </Typography>
            <Grid container spacing={2} className="wrapper">
                {films !== undefined &&
                    films.map((item: Film) => {
                        return (
                            <Grid item key={item.id} md={3} xs={12} className="wrapper">
                                <Checkbox
                                    checked={favoriteFilms.some((m: Film) => m.id === item.id)}
                                    onClick={() => dispatch(setFavoriteFilm({ film: item }))}
                                    className="checkbox"
                                    icon={<StarBorderIcon fontSize="large" />}
                                    checkedIcon={<StarIcon fontSize="large" />}
                                />
                                <div onClick={() => setDialog(item.id!)}>
                                    <MovieItem key={item.id} {...item} />
                                </div>
                            </Grid>
                        );
                    })}
            </Grid>
            {movieDialog && <MovieItemDetailed open={movieDialog} setOpen={setMovieDialog} film={selectedFilm} />}
        </div>
    );
};

export default styled(Gallery)`
    .wrapper {
        position: relative;
    }
    .checkbox {
        position: absolute;
        z-index: 100;
        right: -25px;
        top: -12px;
    }
`;
