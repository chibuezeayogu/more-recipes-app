import 'babel-polyfill';

import axios from 'axios';
import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { setAuthorizationToken } from '../util/setAuthToken';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:26000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUwOTE4NzI2OX0.jp4rZ3sNsdxVr6_GHlGkh6lFOR7VEgIQbObi5e2Z5a4';


export function* loginUser(action){
    console.log('calling Login Api');
    try{
       const response = yield call(axios.post, '/api/v1/users/signin',
        {
            email: action.email,
            password: action.password
        });
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.data));
            const { token } = response.data; 
            
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            const  userData  = jwtDecode(token);
        
            yield put({type: 'SIGN_IN_SUCCESS', userData});
       
    }
    catch(error) {
        if(error){
            console.log("calling Login Api failed");
            //console.log(JSON.stringify(error));
            //console.log(JSON.stringify(error));
            // const { data } = error.response;
            // yield put({type: 'SIGN_IN_FAILURE', data})
        }
        
    }
   
}

export function* getRecipes(){
    try{
    const response = yield call(axios.get, '/api/v1/recipes');
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.data));
            const { data } = response;
            yield put({type: 'GET_ALL_RECIPES_SUCCESS', data});
       
    }
    catch (error) {
        console.log(JSON.stringify(error.response.data));
        console.log(JSON.stringify(error.response.status));
    }
}

export function* addRecipes(action){
    console.log('Sending data to api '+JSON.stringify(action));
    try{
    const response = yield call(axios.post, '/api/v1/recipes',{
        title : action.title,
        description: action.description,
        ingredients: action.ingredients,
        procedures: action.procedures,
        imageURL: action.imageURL
    })
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.data));
            const { data } = response;
            yield put({type: 'ADD_RECIPE_SUCCESS', data});
       
    }
    catch (error) {
        console.log(JSON.stringify(error.response.data));
        console.log(JSON.stringify(error.response.status));
    }
}
 
export function* signUp(action){
    try{
        console.log("calling SignUp Api");
        const response = yield call(axios.post, '/api/v1/users/signup',
            {   
                firstname: action.firstname,
                lastname: action.lastname,
                email: action.email,
                password: action.password,
                profileImageUrl: action.profileImageUrl
            });
            
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.data));
            const { data }  = response;
           yield put({type:"SIGN_UP_SUCCESS", data});

    } 
    catch(error)  {
        if(error){
            console.log("calling SignUp Api Failed");
            console.log(JSON.stringify(error.response.data));
            console.log(JSON.stringify(error.response.status));
            const { data } = error.response;
            yield put({type:"SIGN_UP_FAILURE", data});
        }
    }
}

export function* postComment(action){
    try{
        console.log("calling postComment Api");
        const response = yield call(axios.post, `/api/v1/recipes/${action.index}/reviews`);
            
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.data));
            const { data }  = response;
           yield put({type:"COMMENT_POSTED_SUCCESSFULLY", data});

    } 
    catch(error)  {
        if(error){
            console.log("calling SignUp Api Failed");
            console.log(JSON.stringify(error.response.data));
            console.log(JSON.stringify(error.response.status));
            const { data } = error.response;
            yield put({type:"ERROR_POSTING_COMMENT", data});
        }
    }
}

export function* deleteComment(action){
    try{
        console.log("calling postComment Api");
        const response = yield call(axios.post, `/api/v1/recipes/${action.index}/reviews`);
            
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.data));
            const { data }  = response;
           yield put({type:"COMMENT_DELETED_SUCCESSFULLY", data});

    } 
    catch(error)  {
        if(error){
            console.log("calling SignUp Api Failed");
            console.log(JSON.stringify(error.response.data));
            console.log(JSON.stringify(error.response.status));
            const { data } = error.response;
            yield put({type:"ERROR_DELETING_COMMENT", data});
        }
    }
}

  export function* watchSignin() {
     console.log('watching Api login');
     yield takeEvery('SIGN_IN', loginUser);
 }

 export function* watchSignup() {
    console.log('watching Api createaccount');
    yield takeEvery('SIGN_UP', signUp);
    
}

export function* watchPostComment() {
    console.log('watching Api add comment');
    yield takeEvery('ADD_COMMENT', postComment);
    
}

export function* watchDeleteComment() {
    console.log('watching Api delete comment');
    yield takeEvery('DELETE_COMMENT', deleteComment);
    
}
export function* watchGetRecipes() {
    console.log('watching Api get all recipes');
    yield takeEvery('GET_ALL_RECIPES', getRecipes);
    
}

export function* watchAddRecipes() {
    console.log('watching Api add recipes');
    yield takeEvery('ADD_RECIPE', addRecipes);
    
}

 function* rootSaga() {
    yield all([
        watchSignin(),
        watchSignup(),
        watchPostComment(),
        watchDeleteComment(),
        watchGetRecipes(),
        watchAddRecipes(),
    ]);
}
export default rootSaga;