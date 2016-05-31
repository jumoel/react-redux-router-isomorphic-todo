import { connect } from 'react-redux';
import ErrorMessage from 'common/components/ErrorMessage';

const mapStateToProps = (state) => {
	return {
		message: state.app.errorMessage,
	};
};

export default connect(
	mapStateToProps
)(ErrorMessage);
