import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ItemCheckout from "./ItemCheckout";

export default function CheckoutPage(){
    const { userData, setUserData, setAfterSignInGoTo } = useContext(UserContext);
    const [cartItens, setCartItens] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [disableBuy, setDisableBuy] = React.useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setAfterSignInGoTo('/cart')
        let userSend = userData;
        if (userData===null){
            const getUser = localStorage.getItem("userE-geek");
            if (getUser !== null) {
                setUserData(JSON.parse(getUser));
                userSend = JSON.parse(getUser);
		}}

        if(!userSend?.isLogged || userSend?.isLogged == undefined){
            navigate('/')
        }
        
        if(userSend!==null){
            const config = {
                headers:{
                    authorization: `Bearer ${userSend.token}`
                }
            };
            
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/cartItens`, config)
                .then(answer=>{
                    setCartItens(answer.data)
                    let totalCart = 0
                    answer.data.forEach(element => {
                        totalCart = totalCart + element.price*element.amount
                    });
                    setTotal(totalCart)
                })
                .catch(answer=>{
                    console.log(answer.data)
                })
        }
    },[])


    function goToCheckout(){
        navigate('/checkout')
    }

    return(
        <Container>
            <CartBox>
                <H1>Checkout</H1>
                {cartItens.map((element)=>
                    <ItemCheckout key={element._id} item={element} />
                )}
                <TotalBox>
                    <h1>Total:</h1>
                    <h2>R$ {String(total.toFixed(2).replace('.',','))}</h2>
                </TotalBox>
            </CartBox>
            <CloseCart>
                    <button onClick={goToCheckout} disabled={disableBuy}>Confirmar compra</button>
                    
            </CloseCart>
        </Container>
    )
}

const H1 = styled.h1`
    font-size: 22px;
    width: calc(100% - 50px);
    margin-bottom: 25px;
`

const Container = styled.div`
    height: 100%;
    margin-top: -10px;
    min-height: calc(100vh - 80px);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CartBox = styled.div`
    min-width: 300px;
    max-width: 660px;
    width: 100vw;
    height: 100%;
    background-color: white;
    padding: 20px;
`

const TotalBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    h1{
        font-size: 19px;
    }
    h2{
        font-size: 19px;
    }
`

const CloseCart = styled.div`
    button{
        height: 40px;
        width: 200px;
        border-radius: 5px;
    }
`
