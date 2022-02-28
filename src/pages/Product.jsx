import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    flexDirection: "column",
    padding: "10px",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 90%;
  height: 90vh;
  object-fit: cover;
  ${mobile({
    height: "40vh",
    margin: "0px 15px",
  })}
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
  flex: 1;

  ${mobile({
    padding: "10px",
  })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
  letter-spacing: 1px;
`;

const Price = styled.span`
  font-size: 40px;
  font-weight: 200;
`;

const FilterContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;

  ${mobile({
    width: "100%",
  })}
`;

const Filter = styled.div`
  margin: 30px 0px;
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 25px;
  font-weight: 200;
  margin-right: 5px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 0px 5px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({
    width: "100%",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleQty = (type) => {
    if (type === "desc") {
      qty > 1 && setQty(qty - 1);
    } else {
      setQty(qty + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, color, size, qty }));
  };

  useEffect(() => {
    const getProduct = async (product) => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((clr) => (
                <FilterColor
                  color={clr}
                  key={clr}
                  onClick={() => setColor(clr)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQty("desc")} />
              <Amount>{qty}</Amount>
              <Add onClick={() => handleQty("asc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
