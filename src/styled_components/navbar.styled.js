import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import styled from "styled-components";
import { Button } from '@mui/material';

export const NavbarContainer = styled.nav`
  border: 2px solid #222;
  border-radius: 3px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

export const TopTabsContainer = styled.div`
  background: #fff;
  border: 1.5px solid #dadada;
  border-radius: 6px 6px 0 0;
  padding: 7px 0 7px 10px;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const TabButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 500;
  margin-right: 17px;
  padding-bottom: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ active }) => (active ? "#f06c35" : "#c9c9c9")};
  border-bottom: ${({ active }) => (active ? "2px solid #f06c35" : "none")};

  i {
    margin-right: 6px;
  }

  &:hover {
    color: ${({ active }) => (active ? "#d95d2e" : "#a0a0a0")};
  }
`;

export const Logo = styled.div`
  font-weight: bold;
  min-width: 80px;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 1rem;
`;

export const MenuLink = styled.a`
  font-weight: 500;
  // color: #222;
  text-decoration: none;
  margin-right: 22px;

  a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    transition: color 0.2s ease;

    &.active {
      color: red;
    }
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 850px) {
    margin-right: 14px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;

  .bi {
    color: #1984cb;
    font-size: 1.7rem;
    margin-left: 18px;
    vertical-align: middle;

    @media (max-width: 850px) {
      font-size: 1.3rem;
      margin-left: 12px;
    }
  }
`;

export const Search = styled('div')(({ theme }) => ({
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

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));



// Styled components
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

export const OnlineBadge = styled.span`
  background-color: #28a745;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
`;

export const LogoutButton = styled(Button)`
  && {
    color: #dc3545;
    text-transform: none;
    font-weight: 500;
  }
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
`;

export const ColorCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
  border: ${(p) => (p.active ? "3px solid #000" : "2px solid #ccc")};
  cursor: pointer;
`;

export const ResetButton = styled(Button)`
  && {
    text-transform: none;
    font-size: 12px;
    padding: 2px 8px;
  }
`;