import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({ title, description, keyword }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keyword} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to BroShop",
	description: "We sell the best products for cheap",
	keyword: "electronics, buy electronics, cheap electronics",
};

Meta.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keyword: PropTypes.string,
};

export default Meta;
