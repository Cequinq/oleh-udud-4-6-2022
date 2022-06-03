import React, { FC } from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

interface Props {
    className?: string;
}

const Favorite: FC<Props> = ({ className }) => {
    const favoriteFilms = useSelector((state: RootState) => state.app.favorite);

    return (
        <div className={className}>
            <Typography marginBottom={4} variant="h4" align="center" justifyContent="center">
                <StarIcon fontSize="large" className="icon" />
                Favorite List
            </Typography>
            {favoriteFilms !== undefined && (
                <Typography>
                    {favoriteFilms.map((item: any) => {
                        return <Typography key={item.id}>{item.name}</Typography>;
                    })}
                </Typography>
            )}
        </div>
    );
};

export default styled(Favorite)`
    .icon {
        margin-right: 10px;
    }
`;
