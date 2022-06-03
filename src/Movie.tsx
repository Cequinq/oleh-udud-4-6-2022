import React, { FC } from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import { Favorite, Gallery } from './layout';

interface Props {
    className?: string;
}

const Movie: FC<Props> = ({ className }) => {
    return (
        <Container className={className}>
            <Grid container spacing={2}>
                <Grid item xs={12} md>
                    <Gallery />
                </Grid>
                <Grid item xs md={4}>
                    <Favorite />
                </Grid>
            </Grid>
        </Container>
    );
};

export default styled(Movie)`
    margin-top: 50px;
`;
