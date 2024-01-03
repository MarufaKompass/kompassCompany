import React, { useState } from 'react';
import { Box, Card, Grid, Tooltip, Typography, IconButton } from '@mui/material';

import View from 'components/svg/View';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import DeleteScheduleModal from 'components/modal/ScheduleModal/DeleteScheduleModal';
import { useNavigate } from 'react-router-dom';
import ViewScheduleModal from 'components/modal/ScheduleModal/ViewScheduleModal';

export default function AllSchedule({ data }) {
  const { sc_starttime, sc_endtime, sc_date, scid } = data;
  const [deleteScheduleModal, setDeleteScheduleModal] = useState(false);
  const [viewScheduleModal, setViewScheduleModal] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState('');
  const navigate = useNavigate();

  const handleViewButton = (id) => {
    setViewScheduleModal(true);
    setDeleteScheduleId(id);
  };

  const handleUpdateButton = (id) => {
    navigate(`/schedule/${id}`);
  };

  const handleDeleteButton = (id) => {
    setDeleteScheduleModal(true);
    setDeleteScheduleId(id);
  };

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: '320px',
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '2px 4px 6px rgba(0,0,0, 0.2)',
        '&:hover': {
          boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)',
          border: 2,
          borderColor: '#12A9B2'
        },
        mb: 1,
        mt: 2
      }}
    >
      <Grid container>
        <Grid items xs={6} sm={6}>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ color: '#12A9B2', fontWeight: 'bold', display: 'inline' }}>
              {sc_date} :
              <Typography sx={{ color: '#000', fontWeight: 'bold', display: 'inline' }}>
                {sc_starttime} - {sc_endtime}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid items xs={6} sm={6} display="flex" alignItems="center" justifyContent="end">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 20
            }}
          >
            <Tooltip title="View">
              <IconButton
                onClick={() => handleViewButton(scid)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <View />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleUpdateButton(scid)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteButton(scid)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <ViewScheduleModal
          deleteScheduleId={deleteScheduleId}
          viewScheduleModal={viewScheduleModal}
          handleClose={() => setViewScheduleModal(false)}
        />
        <DeleteScheduleModal
          deleteScheduleId={deleteScheduleId}
          deleteScheduleModal={deleteScheduleModal}
          handleClose={() => setDeleteScheduleModal(false)}
        />
      </Grid>
    </Card>
  );
}
