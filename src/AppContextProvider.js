import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import axiosInstance from 'utils/axios.config';
import { debounce } from 'lodash';

const storage = JSON.parse(sessionStorage.getItem('usersInfo'));
const initialEventDetails = sessionStorage.getItem('eventDetails') || '';
const guest = JSON.parse(sessionStorage.getItem('guest'));
const settlementId = JSON.parse(sessionStorage.getItem('settlementId'));
const LoanEmiId = JSON.parse(sessionStorage.getItem('emiId'));

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(storage);
  const [checkPerson, setCheckPerson] = useState(guest);
  const [allEvent, setAllEvent] = useState([]);
  const [eventId, setEventId] = useState('');
  const [eventDetails, setEventDetails] = useState(initialEventDetails || null);
  const [guestLists, setGuestLists] = useState([]);

  const [invitationId, setInvitationId] = useState(initialEventDetails || null);
  const [eventGuest, setEventGuest] = useState([]);
  const [inviteGuest, setInviteGuest] = useState([]);
  const [error, setError] = useState('');
  const [iouAdjustmentId, setIouAdjustmentId] = useState(settlementId);
  const [adjustment, setAdjustment] = useState('');
  const [iou, setIou] = useState('');

  const [emiId, setEmiId] = useState(LoanEmiId);
  const [notifications, setNotifications] = useState([]);
  const [shortNotifications, setShortNotifications] = useState([]);
  const [readAllData, setReadAllData] = useState(null);
  const [count, setCount] = useState(null);
  const [country, setCountry] = useState([]);
  const [leave, setLeave] = useState([]);
  const [empPayroll, setEmpPayroll] = useState('');
  const [profile, setProfile] = useState('');

  const dataLoaded = useRef(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [tableData, setTableData] = useState([]);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  useEffect(() => {
    if (!dataLoaded.current) {
      async function fetchData() {
        try {
          const response = await axios.get('https://api.hellokompass.com/country/');
          setCountry(response.data.data);
          dataLoaded.current = true;
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [dataLoaded, country]);

  useEffect(() => {
    const fetchData = debounce(() => {
      axiosInstance
        .get('https://api.hellokompass.com/profile')
        .then((res) => {
          setProfile(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, []);

  useEffect(() => {
    const fetchData = debounce(() => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/empprofile')
        .then((res) => {
          setEmpPayroll(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        tableData,
        updateTableData,
        country,
        setCountry,
        error,
        setError,
        user,
        setUser,
        profile,
        setProfile,
        empPayroll,
        setEmpPayroll,
        eventId,
        setEventId,
        invitationId,
        setInvitationId,
        eventDetails,
        setEventDetails,
        eventGuest,
        setEventGuest,
        guestLists,
        setGuestLists,
        inviteGuest,
        setInviteGuest,
        leave,
        setLeave,
        emiId,
        setEmiId,
        shortNotifications,
        setShortNotifications,
        notifications,
        setNotifications,
        readAllData,
        setReadAllData,
        count,
        setCount,
        iouAdjustmentId,
        setIouAdjustmentId,
        adjustment,
        setAdjustment,
        iou,
        setIou,
        checkPerson,
        setCheckPerson,
        allEvent,
        setAllEvent,
        handleTogglePassword,
        password,
        setPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
