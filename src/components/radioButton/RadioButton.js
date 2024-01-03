import React, { useState } from 'react';
import { Box, Typography, Tab, FormControlLabel, Radio } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import GroupInvitation from './GroupInvitation';
import SingleInvitation from './SingleInvitation';

export default function RadioButton({ eventDetails }) {
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChangeRadio,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  });

  return (
    <Box>
      <Typography sx={{ pl: 2, color: '#12a9b2' }} variant="h5" component="div">
        Upload Guest List
      </Typography>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box>
            <TabList
              variant="scrollable"
              scrollButtons={false}
              TabIndicatorProps={{
                style: { background: '#12a9b2' }
              }}
              sx={{
                '& button:focus': { color: '#12a9b2' },
                '& button.Mui-selected': { color: '#12a9b2' },
                border: 'none'
              }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label={
                  <FormControlLabel
                    value="Single Invitation"
                    control={<Radio {...controlProps('a')} size="small" />}
                    label="Single Invitation"
                  />
                }
                value="1"
              />
              <Tab
                label={
                  <FormControlLabel
                    value="Group Invitation"
                    control={<Radio {...controlProps('b')} size="small" />}
                    label="Group Invitation"
                  />
                }
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SingleInvitation eventDetails={eventDetails} />
          </TabPanel>
          <TabPanel value="2">
            <GroupInvitation eventDetails={eventDetails} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
