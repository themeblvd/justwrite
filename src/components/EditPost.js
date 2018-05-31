import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAction } from '../store/posts';

class EditPost extends Component {
    componentDidMount() {
        this.props.updateAction('update');
    }

    render() {
        return (
            <div className="dashboard-edit-post">
                <form>
                    <p>
                        The edit post form for {this.props.match.params.id}...
                    </p>
                </form>
            </div>
        );
    }
}

export default connect(null, { updateAction })(EditPost);
