import React, { useState } from 'react';
import { Box, Grid, Button, Typography, styled, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GroupInvitationTable from 'components/table/GroupInvitationTable';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export default function GroupInvitation({ eventDetails }) {
  const [xsl, setXsl] = useState('');
  const [data, setData] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { qmsg, qmsg_track } = xsl;

  const handleDownload = () => {
    axiosInstance
      .get('https://api.hellokompass.com/event/xlsformat')
      .then((res) => {
        if (res.status === 200) {
          const downloadUrl = res.data.data.url;
          const anchor = document.createElement('a');
          anchor.href = downloadUrl;
          anchor.download = 'guestlistformat.xlsx';
          anchor.style.display = 'none';
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }
      })
      .catch((error) => 'error');
  };

  const onSubmit = (data) => {
    const fileData = new FormData();
    fileData.append('invitee_list', file);
    fileData.append('event_id', data.event_id);

    axiosInstance.post('https://api.hellokompass.com/event/sentslxsnt', fileData).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        navigate('/event');
        reset();
      } else if (res.data.code === 400) {
        toast.failed(res.data.message);
        reset();
      } else {
        <></>;
      }
    });
  };

  const fetchData = async (file) => {
    setFile(file);
    const formData = new FormData();
    formData.append('invitee_list', file);

    try {
      const response = await axiosInstance.post('https://api.hellokompass.com/event/sentslxcheck', formData);

      if (response.data.code === 200) {
        setXsl(response.data.data);
        setData(response.data);
      } else if (response.data.code === 400) {
        toast.failed(response.data.message);
        reset();
      } else {
      }
    } catch (error) {}
  };

  const handleXslChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      fetchData(selectedFile);
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Grid container>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    Step 1
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    :
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                    Download File Format
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{ display: 'flex', justifyContent: { xs: 'left', sm: 'right', md: 'right', lg: 'right' } }}
              >
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  size="small"
                  sx={{ backgroundColor: '#f4a965', '&:hover': { backgroundColor: '#f38f34' } }}
                >
                  <Typography>Download Format</Typography>
                </Button>
                <Input
                  {...register('event_id', { required: true })}
                  sx={{ mt: 1, color: '#4e4d4e', pr: 1, display: 'none' }}
                  value={eventDetails}
                  fullWidth
                  type="text"
                  name="event_id"
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Grid container>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    Step 2
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    :
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                    Upload Guest List
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{ display: 'flex', justifyContent: { xs: 'left', sm: 'right', md: 'right', lg: 'right' } }}
              >
                <Button
                  name="invitee_list"
                  type="file"
                  {...register('invitee_list', { required: true })}
                  onChange={handleXslChange}
                  component="label"
                  variant="contained"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    width: '134.21px',
                    hight: '29.98px',
                    backgroundColor: '#12A9B2',
                    '&:hover': { backgroundColor: '#0e8087' }
                  }}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Grid container>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    Step 3
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    :
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                    Click Send
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {data.code === 200 && (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ pl: { xs: 0, md: 4 }, color: '#ff0000' }}>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Grid container sx={{ mb: 1 }}>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      Upload Request
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      :
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      {qmsg?.['Upload Request']}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mb: 1 }}>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      Valid Found
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      :
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      {qmsg?.['Valid Found']}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      Duplicate Found
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      :
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      {qmsg?.['Duplicate Found']}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>

        {data.code === 200 && (
          <Box>
            <GroupInvitationTable qmsg_track={qmsg_track} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" type="submit" size="large" sx={{ mt: 4, p: 0, color: '#12A9B2'}}>
                Send
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </Box>
  );
}
