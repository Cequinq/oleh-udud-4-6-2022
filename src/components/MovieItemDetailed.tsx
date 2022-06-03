import React, { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Dialog, Grid, Typography } from '@mui/material';
import { Film } from '../redux/reducers/app';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { setFavoriteFilm } from '../redux/actions/app';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/Store';

interface Props extends Film {
    className?: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    film: Film | undefined;
}

const MovieItemDetailed: FC<Props> = ({ open, setOpen, className, film }) => {
    const favoriteFilms = useSelector((state: RootState) => state.app.favorite);
    const dispatch = useAppDispatch();

    // @ts-ignore
    const { name, description, img, year, genres, director, starring, id } = film;

    return (
        <Dialog open={open} className={className} fullWidth maxWidth="md">
            <div className="wrapper">
                <Grid container spacing={1} className="border-margin">
                    <Grid item md xs={12}>
                        <img src={img} className="img" alt="img" />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Typography align="center" justifyContent="center">
                            {name}
                        </Typography>
                        <Typography marginTop={2}>{description}</Typography>
                    </Grid>
                    <Grid item md={1} xs>
                        <Button onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="large" />
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs md={1}>
                        <Checkbox
                            checked={favoriteFilms.some((m: Film) => m.id === id)}
                            // @ts-ignore
                            onClick={() => dispatch(setFavoriteFilm({ film: film }))}
                            className="checkbox"
                            icon={<StarBorderIcon fontSize="large" />}
                            checkedIcon={<StarIcon fontSize="large" />}
                        />
                    </Grid>
                    <Grid item xs md>
                        <Typography align="left">{year}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs md={3}>
                        <Grid container spacing={1}>
                            {genres !== undefined &&
                                genres.map((item: any) => {
                                    return (
                                        <Grid item key={item.id} md={6} xs>
                                            <Typography>{item}</Typography>
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Grid>
                    <Grid item xs md>
                        <Typography>Director: {director}</Typography>
                        <Typography>
                            Starring:
                            {starring !== undefined &&
                                starring.map((item: any) => {
                                    return (
                                        <Typography display="row" key={item.id}>
                                            {item}
                                        </Typography>
                                    );
                                })}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};

export default styled(MovieItemDetailed)`
    .img {
        max-width: 380px;
        max-height: 300px;
    }
    .wrapper {
        margin: 20px;
    }
`;
