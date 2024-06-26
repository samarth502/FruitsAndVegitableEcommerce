const API_URL = 'http://localhost:8080/auth';


const signup = async (data) => {
    console.log("my data" , data)
  try {
    const response = await fetch(`${API_URL}/singup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};


const login = async (data) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.msg || 'User not found');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };


  const getUser = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch user');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }




const AuthService = {
  login,
  signup,
  getUser,
};

export default AuthService;
