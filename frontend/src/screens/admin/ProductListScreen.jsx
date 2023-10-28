import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = () => {
	const { data: products, isLoading, error, refetch } = useGetProductsQuery();

	const [createProduct, { isLoading: isLoadingCreate }] =
		useCreateProductMutation();

	const [deleteProduct, { isLoading: isLoadingDelete }] =
		useDeleteProductMutation();

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure?")) {
			try {
				await deleteProduct(id);
				toast.success("Product deleted");
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const createProductHandler = async () => {
		if (window.confirm("Are you sure to create a new product?")) {
			try {
				await createProduct();
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};
	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button className="btn-sm my-3" onClick={createProductHandler}>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{isLoadingCreate && <Loader />}
			{isLoadingDelete && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/products/${product._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(product._id)}
										>
											<FaTrash style={{ color: "white" }} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default ProductListScreen;