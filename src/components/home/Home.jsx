import React from 'react'
import Banner from '../bannerimage/Banner'
import AllPosts from './posts/AllPosts'
import { Box, Grid,styled } from '@mui/material'
const Home = () => {

  const SuperContainer = styled(Box)`
  background-color:#d1d1ff  
`

  return (
    <>
    <SuperContainer>
    <Banner/>
    <Grid container>
        <Grid container item lg={12} sm={12} xs={12}>
            <AllPosts/>
        </Grid>
    </Grid>
    </SuperContainer>
    </>
  )
}

export default Home