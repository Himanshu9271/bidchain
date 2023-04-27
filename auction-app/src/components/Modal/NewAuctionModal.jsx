import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Web3 from "web3";
import config from "../../config";
const NewAuctionModal = ({open,handleClose,detectCurrentProvider})=>{
    const [data,setData] = useState({
        name:'',
        desc:'',
        initialBid:'',
        bidIncrement:''
    })
    const handleOnChange = (e)=>{
        setData(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    let provider = detectCurrentProvider();
    const web3 =  new Web3(provider);
    const AuctionCreation = new web3.eth.Contract(config.creatorABI,config.auctionCreatorAddress);
  
    const createAuction = async()=>{

        try{

          let address =  await AuctionCreation.methods.createAuction(data.name,data.desc,data.initialBid,data.bidIncrement).send({from:sessionStorage.getItem('accountAddress')});
          console.log(address);
          handleClose();
        }
        catch(e){
            alert("Send Fail");
            console.log(e);
            // handleError()
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        fontFamily:'Poppins',
        pt: 2,
        px: 4,
        pb: 3,
      };
    const rowStyle = {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:'1em'
    }

    return(<Modal
        open={open}
        onClose={handleClose}
        
        
    
    >
         <Box sx={{...style, }}>
            <h1>Create new Auction</h1>
          <Box sx={{...rowStyle}}>
            <Typography width={'10em'} >Name</Typography>
            <TextField name='name' value={data.name} onChange={handleOnChange} ></TextField>
          </Box>
          <Box sx={{...rowStyle}} >
            <Typography width={'10em'}>Description</Typography>
            <TextField name='desc' value={data.desc} onChange={handleOnChange}></TextField></Box>
          <Box sx={{...rowStyle}} >
            <Typography width={'10em'}>Start Price</Typography>
            <TextField name='initialBid' value={data.initialBid} onChange={handleOnChange}></TextField></Box>
          <Box sx={{...rowStyle}} >
            <Typography width={'10em'}>Bid Increment</Typography>
            <TextField name='bidIncrement' value={data.bidIncrement} onChange={handleOnChange} ></TextField></Box>
            <Box sx={{...rowStyle}} >

          <Button variant="contained" color='warning' sx={{marginRight:'auto'}} onClick={handleClose}>Close</Button>
          <Button variant="contained" color='success'  onClick={createAuction}>Create</Button>
            </Box>
        </Box>
    </Modal>)
}
export default NewAuctionModal;