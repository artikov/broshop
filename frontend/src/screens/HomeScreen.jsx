import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useParams, Link } from "react-router-dom";

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();
	const { data, isLoading, isError } = useGetProductsQuery({
		keyword,
		pageNumber,
	});

	return (
		<>
			{keyword ? (
				<Link to="/" className="btn btn-light mb-4">
					Go Back
				</Link>
			) : (
				<ProductCarousel />
			)}
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant={"danger"}>
					{isError?.data?.message || isError.error}
				</Message>
			) : (
				<>
					<Meta />
					<h1>HomeScreen</h1>
					<Row>
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={data.pages}
						page={data.page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
