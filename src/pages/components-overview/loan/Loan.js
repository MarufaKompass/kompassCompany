import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  Input,
  Stack,
  InputLabel
} from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { loanPage } from 'components/validation/Validation';
import { useNavigate } from 'react-router-dom';
import loanImage from '../../../assets/images/image/loan.png';

export default function Loan() {
  const [loanType, setLoanType] = useState([]);
  const navigate = useNavigate();
  const { profile } = useAppContext();
  const { company_id, employee_id } = profile;

  const [emiLength, setEmiLength] = useState('');
  const [emiAmount, setEmiAmount] = useState('');
  const [showEmiAmount, setShowEmiAmount] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loanPage)
  });
  const [selectedLoanType, setSelectedLoanType] = useState('');

  const handleLoanTypeChange = (event) => {
    setSelectedLoanType(event.target.value);
  };

  const onSubmit = (data) => {
    axiosInstance.post('https://api.hellokompass.com/payroll/loanapply', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        reset();
        navigate('/loan/list');
      } else if (res.data.code === 400) {
        toast.failed(res.data.message);
      } else {
        <></>;
      }
    });
  };

  useEffect(() => {
    const fetchData = () => {
      if (company_id) {
        axiosInstance
          .get(`https://api.hellokompass.com/payroll/loantype?com_id=${company_id}`)
          .then((res) => {
            setLoanType(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [company_id]);

  const handleEmiChange = (event) => {
    setEmiLength(event.target.value);
  };
  const handleEmiAmountChange = (event) => {
    const newEmiAmount = event.target.value;
    setEmiAmount(newEmiAmount);
  };

  useEffect(() => {
    if (emiLength && emiAmount && selectedLoanType) {
      axiosInstance
        .get(
          `https://api.hellokompass.com/payroll/emiamount?amount=${emiAmount}&emi_length=${emiLength}&interest=${
            loanType.find((loan) => loan.lonsetsl === selectedLoanType)?.interest || ''
          }`
        )
        .then((res) => {
          setShowEmiAmount(res.data.data);
        })
        .catch((error) => console.error(error));
    }
  }, [emiLength, emiAmount, selectedLoanType, loanType]);

  return (
    <Box>
      <MainCard>
        <Box id="modal-modal-title" sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2">
            Loan Application Form
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ my: 3 }} />
        <Grid container spacinbg={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ my: 4, px: { xs: 0, md: 6, lg: 6, xl: 8 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      {employee_id && (
                        <Input
                          {...register('emp_id', { required: true })}
                          value={employee_id}
                          fullWidth
                          type="text"
                          name="emp_id"
                          inputProps={{ readOnly: true }}
                          sx={{ display: 'none' }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      {company_id && (
                        <Input
                          fullWidth
                          name="com_id"
                          {...register('com_id', { required: true })}
                          id="outlined"
                          size="small"
                          sx={{ display: 'none' }}
                          value={company_id}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      {loanType.find((loan) => loan.lonsetsl === selectedLoanType)?.lonsetsl && (
                        <Input
                          fullWidth
                          name="loan_type_id"
                          {...register('loan_type_id', { required: true })}
                          id="outlined"
                          sx={{ display: 'none' }}
                          value={loanType.find((loan) => loan.lonsetsl === selectedLoanType)?.lonsetsl}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={2} md={2} lg={2} sx={{ display: 'flex', alignitems: 'center' }}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 2 } }}>
                        Loan Type
                      </Typography>
                    </Grid>

                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                          value={selectedLoanType}
                          onChange={handleLoanTypeChange}
                        >
                          <MenuItem value="">
                            <InputLabel selected htmlFor="outlined-adornment">
                              select days
                            </InputLabel>
                          </MenuItem>
                          {loanType.map((loan) => (
                            <MenuItem key={loan.lonsetsl} value={loan.lonsetsl}>
                              {loan.lontyp}
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.loan_type_id?.message}</Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {selectedLoanType && (
                    <Grid container>
                      <Grid items={true} xs={12} sm={2} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="h4">
                          Charges/Interest
                        </Typography>
                      </Grid>
                      <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                        <FormControl fullWidth>
                          <Box sx={{ mt: 2 }}>
                            <TextField
                              fullWidth
                              value={`${loanType.find((loan) => loan.lonsetsl === selectedLoanType)?.interest || ''}%`}
                              readOnly
                              name="interest"
                              id="outlined"
                              size="small"
                            />
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={2} md={2} lg={2}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 2 } }}>
                        EMI Tenor
                      </Typography>
                    </Grid>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      <FormControl fullWidth>
                        <Select
                          {...register('emi_length', { required: true })}
                          value={emiLength}
                          name="emi_length"
                          onChange={handleEmiChange}
                          displayEmpty
                          type="text"
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                        >
                          <MenuItem value="">
                            <InputLabel selected htmlFor="outlined-adornment">
                              tenor
                            </InputLabel>
                          </MenuItem>
                          {loanType.find((loan) => loan.lonsetsl === selectedLoanType)
                            ? Array.from({ length: loanType.find((loan) => loan.lonsetsl === selectedLoanType).emilimit }, (_, index) => {
                                return (
                                  <MenuItem key={index} value={index + 1}>
                                    {`${index + 1} month${index > 0 ? 's' : ''}`}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.emi_length?.message}</Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={2} md={2} lg={2}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 2 } }}>
                        Amount
                      </Typography>
                    </Grid>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      <TextField
                        fullWidth
                        name="amount"
                        {...register('amount', { required: true })}
                        placeholder="0.00"
                        id="outlined"
                        size="small"
                        type="number"
                        value={emiAmount}
                        onChange={handleEmiAmountChange}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">BDT</InputAdornment>
                        }}
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.amount?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={2} md={2} lg={2}>
                      <Typography variant="h6" component="h4" sx={{ mt: 2 }}>
                        EMI Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10} lg={10}>
                      <Box border="1px solid #C8C8C6" borderRadius="5px" sx={{ mb: 2, mt: 2, py: 1, display: 'flex' }}>
                        <Typography color="#8C8C8C" sx={{ pl: '10px' }}>
                          BDT{' '}
                        </Typography>
                        <Typography sx={{ pl: '20px' }}>{showEmiAmount?.amtinfo ? showEmiAmount.amtinfo : ''}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: -2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={2} md={2} lg={2}>
                      <Typography variant="h6" component="h4" sx={{ mt: 2 }}>
                        Total Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10} lg={10}>
                      <Box border="1px solid #C8C8C6" borderRadius="5px" sx={{ mb: 2, mt: 2, py: 1, display: 'flex' }}>
                        <Typography color="#8C8C8C" sx={{ pl: '10px' }}>
                          BDT{' '}
                        </Typography>
                        <Typography sx={{ pl: '20px' }}>{showEmiAmount?.amttotal ? showEmiAmount.amttotal : ''}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid items={true} xs={12} sm={2} md={2} lg={2}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 2 } }}>
                        Reason
                      </Typography>
                    </Grid>
                    <Grid items={true} xs={12} sm={10} md={10} lg={10}>
                      <TextField
                        {...register('note', { required: false })}
                        minRows={3}
                        maxRows={6}
                        name="note"
                        multiline
                        placeholder="Enter your text here"
                        style={{ width: '100%' }}
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.note?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      px: 5,
                      backgroundColor: '#12A9B2',
                      '&:hover': {
                        backgroundColor: '#0e8087'
                      }
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src={loanImage} alt="loan" height="100%" width="100%" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
