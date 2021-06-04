import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';
import Review from './Review';

const Wrapper = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    &:last-child {
        background: #000;
    }
`;

const Main = styled.div`
    padding-left: 50px;
`;

const Airline = () => {
    const [airline, setAirline] = useState({});
    const [review, setReview] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        const url = `/api/v1/airlines/${slug}`;
        axios.get(url)
            .then( res => {
                setAirline(res.data);
                setLoaded(true);
            })
            .catch( res => console.log(res));
    }, []);

    const handleChange = (e) => {
        e.preventDefault();

        setReview(Object.assign({}, review, { [e.target.name]: e.target.value }))
        console.log('review', review);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        const airline_id = airline.data.id;
        axios.post(`/api/v1/reviews`, { review, airline_id })
            .then(res => {
                const included = [...airline.included, res.data.data];
                setAirline({ ...airline, included });
                setReview({ title: '', description: '', score: 0 });
            })
            .catch(res => {});
    };

    const setRating = (score, e) => {
        e.preventDefault();

        setReview({ ...review, score });
    };

    let reviews;
    if(loaded && airline.included) {
        reviews = airline.included.map((item, index) => {
            return (
                <Review key={index} attributes={item.attributes} />
            );
        });
    };

    return (
        <Wrapper>
            {loaded && 
                <>
                    <Column>
                        <Main>
                            <Header attributes={airline.data.attributes} reviews={airline.included} /> 
                            {reviews}
                        </Main>
                    </Column>

                    <Column>
                        <ReviewForm 
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setRating={setRating}
                            attributes={airline.data.attributes}
                            review={review}
                        />
                    </Column>
                </>
            }  
        </Wrapper>
    );
};

export default Airline;