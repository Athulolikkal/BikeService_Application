import { Box, styled } from "@mui/material";


export const ContainerBox=styled(Box)(({theme})=>({
    display: 'flex', 
    alignItems: 'center', 
    justifyContent:'center',
    width:'100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
       

    },


}))



export const WrapperBox = styled(Box)(({ theme }) => ({
   display:'flex',
   flexDirection:'column',
    backgroundColor: 'white',
    height: 'auto',
   
    width: '25%',
    padding: theme.spacing(2, 2, 2, 2),
    borderRadius: '15px',
    // marginTop: '1rem',
    border: '2px solid #867070',
    marginBottom:'1rem',
    marginRight:'8px' ,
   
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',

    },
   
}))

