import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface User {
    name: string 
    picture:string 
    sub: string
}
interface CreatedUser{
    _id: string
    _type:string
    userName: string
    image: string
}
export const createOrGetUser = async (response: string, addUser: any) => {
  
  const { name, picture, sub }: User = jwtDecode(response)
  
  const user: CreatedUser = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }
  
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};

