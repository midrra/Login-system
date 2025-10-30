import React,{useContext} from 'react';
import { initialRefresh } from '../context/InitialRefreshToken';
import { useContext } from 'react';


export function useInitialRefreshToken() {
  return useContext(initialRefresh)
}

