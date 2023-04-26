import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {


    render() {
        return (
            <div className="section-share section-about">
                <div className=" section-about-header">
                    Truyền thông nói về Channel Hỏi Dân IT
                </div>
                <div className=" section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="300"
                            src="https://www.youtube.com/embed/7xL9c39DhjI"
                            title="Book Search App With Open Library Search API Using React JS | React JS Project For Beginners"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>Book Search App With Open Library Search API Using React JS | React JS Project For Beginners</p>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
