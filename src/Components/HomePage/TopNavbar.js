import React,{useState,useEffect} from 'react';
import { Box ,AppBar,Toolbar,IconButton,Tooltip,Menu,MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputBase from '@mui/material/InputBase';
import { alpha,styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import imageLogo from "../../assets/TMS_logo1.png";
import * as actions from "../../actions";
import MicrosoftIcon from '@mui/icons-material/Microsoft';


 const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

 const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

 const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function TopNavbar({isMobile,setIsMobile}) {
  const collapsed =useSelector((state)=>state.login.collapsed)
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pendingRoute, setPendingRoute] = React.useState(null);

      useEffect(() => {
        if (!anchorEl && pendingRoute) {
          navigate(pendingRoute);
          setPendingRoute(null);
        }
      }, [anchorEl, pendingRoute, navigate]);
    
      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
       const handleMenu = (event) => setAnchorEl(event.currentTarget);
      const handleClose = () => setAnchorEl(null);
      const handleNavigate = (path) => {
        setPendingRoute(path);
        handleClose();
      };


  return (
     <AppBar
        position="fixed"
        sx={{ backgroundColor: "rgba(241, 125, 58, 0.89)",backdropFilter:"blur(5px)", zIndex: 1201 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton
                    onClick={() => dispatch(actions.openCollapsed(collapsed))}
                    sx={{ color: "white" }}
                >
                {collapsed ? <MenuIcon /> : <HighlightOffIcon/> } 
                </IconButton>
                <img src={imageLogo} height={'auto'} width={'128px'} alt = "cannot render" />
                {/* <h3 style={{padding:'0.5px 5px',border:'2px solid White',borderRadius:'4px'}}>TRACK IT</h3> */}
            </div>
          <Box sx={{ flexGrow: 1 }} />
          {/* Right icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
             <Toolbar style={{paddingRight:'0px'}}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  id='searchfield'
                  placeholder="Search…"
                  onChange={(e)=>e.preventDefault()}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
            <Tooltip title="Notifications">
              <IconButton sx={{ color: "white" }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton sx={{ color: "white" }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton onClick={handleMenu} sx={{ color: "white" }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleNavigate("/account-details")}>
                My account
              </MenuItem>
              <MenuItem onClick={() =>
                { 
                 dispatch(actions.logout())
                 navigate("/login", { replace: true });
                //  handleNavigate("/login")
                }
                 }>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar> 
  )
}
