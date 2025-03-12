import styled from "styled-components";
const ProductItem = ({ product }) => {
  if (!product) return null;

  return (
    <ProductContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title?.substring(0, 20)}</ProductTitle>

      <ProductDetailsRow>
        <ProductInfo>
          <Label>Category:</Label>
          <ProductCategory>
            {product.category
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </ProductCategory>
        </ProductInfo>

        <ProductInfo>
          <Label>Brand:</Label>
          <ProductBrand>
            {product.brand
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </ProductBrand>{" "}
        </ProductInfo>
      </ProductDetailsRow>

      {/* Price in a separate row */}
      <ProductInfo>
        <Label>Price:</Label>
        <ProductPrice>${product.price?.toFixed(2)}</ProductPrice>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  max-width: 380px;
  min-width: 380px;
  margin: 20px auto;
  border: 1px solid #999;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 210px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  margin: 5px 0;
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* New Flex Row for Category & Brand */
const ProductDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const ProductCategory = styled.p`
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  background-color: #555;
  padding: 5px;
`;

const ProductBrand = styled(ProductCategory)``;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
`;
