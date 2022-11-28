import styled from "styled-components";
import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { accentColor, baseColor, textBaseColor } from '../../constants/colors.js';

export default function ItemCart({item, reloadComponent, setDisableBuy}){
    const { userData } = useContext(UserContext);
    const [amount, setAmount] = React.useState(item.amount)
    const [disabled, setDisabled] = React.useState(false)

    function handleForm(e) {
		let qty = amount;
        setDisableBuy(true)
        setDisabled(true)
        const config = {
            headers:{
                authorization: `Bearer ${userData.token}`
            }
        };


		if (e.target.id === 'increment') {
			qty++;
		} else {
			qty--;
		}
        
        const body = {
            amount: qty,
            itemId: item._id
        }
        if(qty<1){
            qty=1
        }
		setAmount(qty);
        
        if(qty!==amount){
            axios.put(`${process.env.REACT_APP_API_BASE_URL}/cartItem`,body, config)
                .then(answer=>{
                    setDisabled(false)
                    reloadComponent()
                })
                .catch(answer=>{
                    setDisabled(false)
                    console.log(answer.data)
                })
        }else{
            setDisabled(false)
            setDisableBuy(false)
        }
	}

	function handleFormInput(e){
		let qty = amount;
		
		if (e.target.value>=0){
			qty = e.target.value
		} else if (e.target.value === ''){
			qty = e.target.value
		}
		setAmount(qty);
	}

	function handleFormInputLeave(e){
        setDisabled(true)
        setDisableBuy(true)
		let qty = amount;

		if (e.target.value<1){
			qty = 1
		} else if (e.target.value === ''){
			qty = 1
		}
		setAmount(qty);
        if(qty!==item.amount){
            
            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            };
            const body = {
                amount: qty,
                itemId: item._id
            }

            axios.put(`${process.env.REACT_APP_API_BASE_URL}/cartItem`,body, config)
                .then(answer=>{
                    setDisabled(false)
                    reloadComponent()
                })
                .catch(answer=>{
                    setDisabled(false)
                    console.log(answer.data)
                })
        }
	}

    function deleteItem(){
        setDisabled(true)
        setDisableBuy(true)
        const config = {
            headers:{
                authorization: `Bearer ${userData.token}`
            }
        };

        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cartItem/${item._id}`, config)
            .then(answer=>{
                setDisabled(false)
                reloadComponent()
            })
            .catch(answer=>{
                setDisabled(false)
                console.log(answer.data)
            })
    }


    return(
        <Container>
            <ImageBox>
                <img src={item.mainimage} alt={item.name} />
            </ImageBox>
            <Information>
                <TopBox>
                    <h1>{item.name}</h1>
                    <ion-icon name="trash-outline" onClick={deleteItem} ></ion-icon>
                </TopBox>
                <BottonBox>
                    <form>
                        <button id='decrement' type='button' onClick={handleForm} disabled={disabled}>
                            &mdash;
                        </button>
                        <input type='number' value={amount} onChange={handleFormInput} onBlur={handleFormInputLeave} disabled={disabled}/>
                        <button id='increment' type='button' onClick={handleForm} disabled={disabled}>
                            &#xff0b;
                        </button>
                    </form>
                    <h2>{String((item.amount*item.price).toFixed(2)).replace('.',',')}</h2>
                </BottonBox>
            </Information>
        </Container>
    )
}



const Container = styled.div`
    height: 100px;
    border-bottom: 1px solid silver;
    display: flex;
    align-items: center;
    &:first-of-type{
        border-top: 1px solid silver;
    }
`

const TopBox = styled.div`
    display: flex;
    justify-content: space-between;
    h1{
        font-size: 14px;
    }
`

const BottonBox = styled.div`
    display: flex;
    justify-content: space-between;
    h2{
        font-size: 16px;
    }
    form {
		display: flex;
		margin-bottom: 5px;
		justify-content: center;
		align-items: center;
		width: 70px;
		max-width: 120px;
		border-radius: 3px;
		font-size: 18px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		input {
			width: 60%;
			border: 0;
			border-top: 0 solid ${accentColor};
			border-bottom: 0 solid ${accentColor};
			text-align: center;
		}
		button {
			width: 40%;
			border: 0 solid ${accentColor};
			color: ${textBaseColor};
			text-align: center;
			text-shadow: 0 1px 0 rgba(#fff, 0.6);
			cursor: pointer;
			background: ${baseColor};
			&:hover {
				background: darken(${baseColor}, 10%);
				color: darken(${textBaseColor}, 20%);
			}
			&--left {
				border-radius: 3px 0 0 3px;
			}
			&--right {
				border-radius: 0 3px 3px 0;
			}
		}
	}
`

const ImageBox = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    img{
        height: 50px;
    }
`

const Information = styled.div`
    margin-left: 15px;
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 20px;
`