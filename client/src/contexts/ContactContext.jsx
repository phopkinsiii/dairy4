/* eslint-disable react-refresh/only-export-components */
//@ts-nocheck

import React, { createContext, useReducer, useContext } from 'react';
import axiosInstance from '../api/axios.js'
import { toast, ToastContainer } from 'react-toastify';


const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	company: '',
	subject: '',
	message: '',
	loading: false,
	error: null,
	submitted: false,
	successMessage: '', // New property to store the success message
  };
  
  const contactReducer = (state, action) => {
	switch (action.type) {
	  case 'UPDATE_FIELD':
		return { ...state, [action.field]: action.value };
	  case 'SUBMIT_REQUEST':
		return { ...state, loading: true, error: null, successMessage: '' };
	  case 'SUBMIT_SUCCESS':
		// Reset the form and store a success message:
		return { ...initialState, submitted: true, successMessage: action.payload, loading: false };
	  case 'SUBMIT_FAIL':
		return { ...state, loading: false, error: action.payload };
	  case 'RESET_FORM':
		return initialState;
	  default:
		return state;
	}
  };

const ContactContext = createContext();

export const ContactProvider = ({children}) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Function to submit the contact form to the backend
  const submitContactForm = async (formData) => {
    dispatch({type: 'SUBMIT_REQUEST'});
    try {
      const response = await axiosInstance.post('/contact', formData);
      dispatch({type: 'SUBMIT_SUCCESS',
		payload: 'Your message has been sent successfully!'
	  });
	  toast.success('Your message has been sent successfully! Thank you!')
      return response
    } catch (error) {
		const errMsg = error.resonse?.data?.message || error.message;

      dispatch({
        type: 'SUBMIT_FAIL',
        payload:errMsg,
      })
	  toast.error('Failed to send your message. Please try again.')
      throw error;
    }
   
  }
	return (
    <ContactContext.Provider value={{state, dispatch, submitContactForm}}>
      {children}
    </ContactContext.Provider>
  )
};

export const useContactContext = () => useContext(ContactContext);
