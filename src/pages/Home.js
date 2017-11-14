import React from 'react';
import { connect } from 'react-redux';

import Skills from '../organisms/Skills';
import Footer from '../organisms/Footer';
import Contact from '../organisms/Contact';
import PageTitle from '../atoms/PageTitle';
import Portfolio from '../organisms/Portfolio';
import { retrieveContent } from '../ducks/content';
import { retrieveImages } from '../ducks/images';
import Introduction from '../organisms/Introduction';

class Home extends React.Component
{
    componentWillMount()
    {
        this.props.getContent();
        this.props.getImages();
    }

    render()
    {
        const { content } = this.props;
        return (
            <div className='col-sm' style={{ padding: 0 }}>
                { content && <PageTitle>{ content.filter(item => item.type === 'header')[0].title }</PageTitle>}
                <Introduction/>
                <Skills/>
                <Portfolio/>
                <Contact/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = ({ content }) => ({ content });

const mapDispatchToProps = (dispatch) => ({
    getContent: () => dispatch(retrieveContent()),
    getImages: () => dispatch(retrieveImages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
