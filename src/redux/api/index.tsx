import auth from '@react-native-firebase/auth'
export const autoSignIn =  ()=>{
  return( new Promise((resolve, reject)=>{
    auth().onAuthStateChanged((user)=>{
        if(user){
            resolve({
                data: user,
                isAuth: true
            })
        }else{
            resolve({ data: {}, isAuth: false, user: {} });
        }
    })
  }))
}
export const logoutUser = ()=>{
     auth().signOut()
}
export const loginUser = async (email: string, password: string)=>{
  const response = await auth().signInWithEmailAndPassword(email, password);
  if(response){
    return {isAuth: true, data: response.user}
  }
}
export const loginUserWithPhoneNumber = async (phoneNumber: string)=>{
  const response = await auth().signInWithPhoneNumber( `+${phoneNumber}`, true)
  return response;
}
