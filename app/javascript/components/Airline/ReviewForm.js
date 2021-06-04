import React, { Fragment } from 'react';
import styled from 'styled-components';
import Gray from './Stars/Gray';
import Selected from './Stars/Selected';
import Hover from './Stars/Hover';

const RatingContainer = styled.div`
    text-align: center;
    border-radius: 4px;
    font-size: 18px;
    padding: 40px 0 10px 0;
    border: 1px solid #e6e6e6;
    background: #fff;
`;

const RatingBox = styled.div`
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    position: relative;
    margin-top: 12px;
    margin-bottom: 15px;

    input {
        display: none;
    }

    label {
        cursor: pointer;
        width: 50px;
        height: 50px;
        background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 70%;
    }

    input:checked ~ label,
    input:checked ~ label ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
    }

    input:not(:checked) ~ label:hover,
    input:not(:checked) ~ label:hover ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
    }
`;

const Field = styled.div`
    border-radius: 4px;

    input {
        min-height: 50px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        margin: 0 0 20px 0;
        padding: 12px;
        width: 97%;
    }

    textarea {
        width: 97%;
        min-height: 80px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        margin: 0 0 20px 0;
        padding: 12px;
    }
`;

const Wrapper = styled.div`
    background: #000;
    padding: 20px;
    height: 100vh;
    padding-top: 150px;
`;

const Submit = styled.button`
    color: #fff;
    background: #58eb34;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-size: 25px;
    font-weight: 300;
    cursor: pointer;
    transition: ease-in-out 0.1s;
    width: 100%;
    margin-top: 20px;

    &:hover {
        background: rgba(88, 235, 52, 0.8);
    }
`;

const Headline = styled.div`
    padding: 20px 0px ;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
`;

const RatingTitle = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
    font-weight: bold;
`;

const ReviewForm = (props) => {
    const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
        return (
            <Fragment key={`rating-${score}`}>
                <input type="radio" value={score} checked={props.review.score === score} name="rating" onChange={() => console.log('selected: ', score)} />
                <label onClick={props.setRating.bind(this, score)}></label>
            </Fragment>
        );
    });

    return (
        <Wrapper>
            <form onSubmit={props.handleSubmit}>
                <Headline>Have an experience with {props.attributes.name} ? Share your review.</Headline>
                <Field>
                    <input onChange={props.handleChange} value={props.review.title} type="text" name="title" placeholder="Review Title" />
                </Field>
                <Field>
                    <textarea onChange={props.handleChange} value={props.review.description} type="text" name="description" placeholder="Review Description" />
                </Field>
                <Field>
                    <RatingContainer>
                        <RatingTitle>
                            Rate this Airline
                        </RatingTitle>
                        <RatingBox>
                            {ratingOptions}
                        </RatingBox>
                    </RatingContainer>
                </Field>
                <Submit type="submit">Submit Your Review</Submit>
            </form>
        </Wrapper>
    );
};

export default ReviewForm;