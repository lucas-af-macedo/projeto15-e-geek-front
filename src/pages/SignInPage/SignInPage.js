import styled from "styled-components";
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function SignInPage(){
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [disabled, setDisabled] = React.useState(false);
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    });

    function postLogin(event){
        setDisabled(true);
        event.preventDefault();
        const URL = `${baseURL}sign-in`;
        const body = {...form};
        const  request = axios.post(URL, body)
        request.then(answer => {
            const user = JSON.stringify(answer.data)
            localStorage.setItem("user", user)
            navigate('/')
		});
        request.catch(answer => {
            console.log('error'); //add alert
            setDisabled(false);
        })
    }

    function handleForm(event){
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    return(
        <Container>
            <SignInContainer>
                <form onSubmit={postLogin}>
                    <input placeholder="Email" type='email' name="email" onChange={handleForm} value={form.email} required disabled={disabled} />
                    <input placeholder="Senha" type='password' name="password" onChange={handleForm} value={form.password} required disabled={disabled} />
                    <button type="submit" disabled={disabled} >Entrar</button>
                </form>
            </SignInContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SignInContainer = styled.div`
    max-width: 350px;
    width: calc(100% - 10px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input{
        margin-bottom: 10px;
        height: 45px;
        border: 0px;
        border-radius: 4px;
        outline: 0px;
    }
    button{
        margin-top: 20px;
        height: 45px;
        border: 0px;
        border-radius: 4px;
    }

`