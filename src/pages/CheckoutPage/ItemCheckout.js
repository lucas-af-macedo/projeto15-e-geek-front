import styled from "styled-components";

export default function ItemCheckout({item}){

    return(
        <Container>
            <ImageBox>
                <img src={item.mainimage} alt={item.name} />
            </ImageBox>
            <Information>
                <TopBox>
                    <h1>{item.name}</h1>
                </TopBox>
                <BottonBox>
                    <h1>Itens: {item.amount}</h1>
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