import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
// material-ui
import {Divider, List, Typography } from '@mui/material';

// project import

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
import { useAppContext } from 'AppContextProvider';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {

  // console.log(item);
  const { profile } = useAppContext();
  const { module_list = {} } = profile;
  const theme = useTheme();
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  // const navCollapse = item.children?.map((menuItem) => {
  //   switch (menuItem.type) {
  //     case 'collapse':
  //       return <NavCollapse key={menuItem.id} item={menuItem} level={1} />;
  //     case 'item':
  //       return <NavItem key={menuItem.id} item={menuItem} level={1} />;
  //     default:
  //       return (
  //         <Typography key={menuItem.id} variant="h6" color="error" align="center">
  //           Fix - Group Collapse or Items
  //         </Typography>
  //       );
  //   }
  // });

  const navCollapse = item.children?.map((menuItem) => {
    return module_list.payroll === true
      ? // When module_list.payroll is true
        (() => {
          switch (menuItem.type) {
            case 'collapse':
              return <NavCollapse key={menuItem.id} item={menuItem} level={1} />;
            case 'item':
              return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
              return (
                <Typography key={menuItem.id} variant="h6" color="error" align="center">
                  Fix - Group Collapse or Items
                </Typography>
              );
          }
        })()
      : // When module_list.payroll is false
        (() => {
          switch (menuItem.type) {
            case 'collapse':
              return <> </>;
            case 'item':
              return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
              return (
                <Typography key={menuItem.id} variant="h6" color="error" align="center">
                  Fix - Group Collapse or Items
                </Typography>
              );
          }
        })();
  });

  return (

       <>
      {module_list.payroll === true ? (
        <List
          subheader={
            item.title && (
              <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom ml={2}>
                {item.title}
                {item.caption && (
                  <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                    {item.caption}
                  </Typography>
                )}
              </Typography>
            )
          }
          sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {navCollapse}
          <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </List>
      ) : (
        <List>{navCollapse}</List>
        
      )}
    </>
   
   
  
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
