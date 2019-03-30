import { connect } from 'react-redux';
import CountdownTimer from './CountdownTimer';
import {getCurrTrip} from "../../../redux/getters/getTrips";

const mapStateToProps = (state) => {
    return {
        currTripInfo: getCurrTrip(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CountdownTimer);

export default CountdownContainer;
