import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../Navigation/NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {

 CaretUpOutlined,
 CaretDownOutlined

} from '@ant-design/icons';
// icons
const icons = {
  CaretUpOutlined,
  CaretDownOutlined
};


export default function NavCollapse({ level, item }) {
  console.log(item)
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? item.id : null);
  };

  let menus = null;
  if (item.children) {
    menus = item.children.map((menuItem) => {
      switch (menuItem.type) {
        case 'collapse':
          if (menuItem.id === 'doubleSubmenu') {
            // Render a dropdown for "Attendance History" submenu items
            const submenuItems = menuItem.children.map((subItem) => (
              <NavItem key={subItem.id} item={subItem} level={level + 1} />
            ));
            return (
              <NavCollapse key={menuItem.id} item={menuItem} level={level + 1}>
                {submenuItems}
              </NavCollapse>
            );
          }
          return null; // Handle other collapses if needed

        case 'item':
          return <NavItem key={menuItem.id} item={menuItem} level={level + 1} />;

        default:
          return (
            <Typography key={menuItem.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
  }
  
  
  const Icon = item.icon;
  const menuIcon = item.icon ? (
    <Icon strokeWidth={1} size=".9rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === item.id ? 8 : 6,
        height: selected === item.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`
        }}
        selected={selected === item.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item.icon ? 18 : 30 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === item.id ? 'h6' : 'body1'} fontSize=".9rem" fontWeight="bold" color="inherit" sx={{ my: 'auto' }}>
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
         {open ? (
                    <icons.CaretUpOutlined stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <icons.CaretDownOutlined  stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: '#12a9b2'
            }
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
}
NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};
