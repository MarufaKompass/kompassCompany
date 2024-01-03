import React from 'react';
import { Chip } from '@mui/material';
import Uppercase from 'components/Uppercase/Uppercase';

export default function CustomChip({ children }) {
  if (!children) {
    return null;
  }

  return Uppercase(children) === 'Cancel' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#ED5E68', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'No' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#ED5E68', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Waiting' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#ffc107', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Pending' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#F29339', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Active' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#6AA84F', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Declined' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#ED5E68', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Ok' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#12A9B2', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Unpaid' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#F0AD4E', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Paid' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#38B04A', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Approved' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#7858d7', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Request' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#75D029', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Invitation' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#808593', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Complete' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#008000', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === 'Accept' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#12A9B2', color: '#fff', borderRadius: 1 }} />
  ) : Uppercase(children) === '-' ? (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: 'transparent' }} />
  ) : (
    <Chip label={Uppercase(children)} size="small" sx={{ backgroundColor: '#4EA20F', color: '#fff', borderRadius: 1 }} />
  );
}
