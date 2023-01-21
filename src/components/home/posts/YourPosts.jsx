import React from 'react'
import { useState,useEffect, useContext } from 'react'
import { API } from '../../../service/api'
import { Box, Grid, styled } from '@mui/material'
import Post from './Post'
import { Link, useSearchParams } from 'react-router-dom'
import { DataContext } from '../../../context/DataProvider'
import Banner from '../../bannerimage/Banner'
const YourPosts = () => {

    const [posts, setPosts] = useState([])
    const [searchParams] = useSearchParams();
    const {account}=useContext(DataContext);
    const company = searchParams.get('company');

    useEffect(() => {
       const fetchPostsData=async ()=>{
            let response  = await API.getAllPosts({companyName: company || ''});
            console.log(response.data)
            if(response.isSuccess){
                setPosts(response.data);
            }
        }
        fetchPostsData();
    }, [company])

    useEffect(() => {
        const fetchMyPostsData=async ()=>{
             let response  = await API.getMyPosts({username: account.username});
             console.log(response.data)
             if(response.isSuccess){
                 setPosts(response.data);
             }
         }
         fetchMyPostsData();
     }, [])


const SuperContainer = styled(Box)`
background-color:#d1d1ff 
`
     
   

  return (
    <>
    <SuperContainer>
    <Banner/>
    <Grid container>
        <Grid container item lg={12} sm={12} xs={12}>
        {   
            posts && posts.length > 0 ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`/details/${post._id}`} style={{textDecoration:'none' , color:'inherit'}}>
                        <Post post = {post}/>
                    </Link>
                </Grid>
            ))
            :
            <Box style={{ color:'#878787', margin:'30px 80px', fontSize:18 }}>No data available to display</Box>
        }
        </Grid>
    </Grid>
        
    </SuperContainer>
    </>
  )
}

export default YourPosts