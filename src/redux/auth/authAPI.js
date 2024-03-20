import axios from "axios";
  
  
  export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,loginInfo);
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check`);
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  
  export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
        if (response.ok) {
          resolve({ data:'success' });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
    });
  }
  
  
  export function resetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password-request`,email
      );
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  export function resetPassword(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`,data);
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }