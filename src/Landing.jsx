import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./apis/productService";
import SearchInput from "./components/SearchInput";
import ProductItem from "./components/ProductItem";
import styled from "styled-components";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);
  // const [hasNextPage, setHasNextPage] = useState(true);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", query, page],
    queryFn: () => fetchProducts(query, page),
    keepPreviousData: true, // Retains old data during new fetch
  });

  useEffect(() => {
    if (products.length > 0) {
      setProductList((prev) => [...prev, ...products]);
    }
  }, [products]);

  const loadMore = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <h1>Product Search</h1>
      <SearchInput
        placeholder="Search products..."
        query={query}
        setQuery={(val) => {
          setQuery(val);
          setPage(1);
        }}
        data={productList}
        isLoading={isLoading}
        isError={isError}
        onSelect={setSelectedProduct}
        itemKey="id"
        renderItem={(product) => <span>{product.title}</span>}
        allowMultiple
        loadMore={loadMore}
      />

      <ProductListContainer>
        {selectedProduct.length > 0 &&
          selectedProduct.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </ProductListContainer>
    </Container>
  );
};

export default Landing;

/* Styled Components */
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const ProductListContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 20px;
  margin-top: 20px;
  grid-template-columns: repeat(1, 1fr); /* Mobile */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Tablets */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Desktops */
  }
`;
