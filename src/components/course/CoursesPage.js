import React, { PropTypes } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from "redux";

class CoursesPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			course: {title: ""}
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onClickSave() {
		this.props.actions.createCourse(this.state.course);
	}

	courseRow(course, index) {
		return <div key={index}>{course.title}</div>;
	}

	render() {
		return (
			<div>
				<h1>Courses</h1>
				{this.props.courses.map(this.courseRow)}
				<h2>Add Course</h2>
				<input
					type="text"
					onChange={this.onTitleChange}
					value={this.state.course.title}
				/>
				<input
					type="submit"
					value="Save"
					onClick={this.onClickSave}
				/>
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.func
};

function mapStateToProps(state, ownProps) {
	return {
		// .courses --> look into rootReducer!
		courses: state.courses
	};
}

// WHat actions to expose on components
// dispatch - is injected in by the connect()
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

/* Same as
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
connectedStateAndProps(CoursesPage);
*/

/*
	Once we add mapDispatchToProps to connect(), the dispatch fn will no longer
	be attached to our component
*/
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);