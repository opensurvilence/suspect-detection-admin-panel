import Cookies from 'js-cookie';

const logout = ()=>{
    // get access token from cookie
    const accessToken = Cookies.get('access_token');
    if(accessToken){
        // clear access token cookie
        Cookies.remove('access_token');
        Cookies.remove('user');
        console.log('logout successfull');
        
        // console.log('user state ',Cookies.get('user'));
        window.location.reload()
        return {
            'status':1,
            'message':'logout successfull'
        }
    }else{
        return {
            'status':0,
            'message':'unauthorized action'
        }
    }
}

export default logout;