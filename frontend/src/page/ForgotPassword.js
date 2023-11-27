import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert(message)
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
        setEmail('');
    }

    return (
        <Fragment>

            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false} >
                    Send Email
                </button>

            </form>


        </Fragment>
    )
}

export default ForgotPassword