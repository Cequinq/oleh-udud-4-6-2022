import React, { FC } from 'react';
import styled from 'styled-components';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
    className?: string;
    img?: string;
    name?: string;
    year?: string;
}

const MovieItem: FC<Props> = ({ img, name, year }) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" image={img} alt="img" width={250} height={250} />
                <CardContent>
                    <Typography>{name}</Typography>
                    <Typography>{year}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default styled(MovieItem)``;
