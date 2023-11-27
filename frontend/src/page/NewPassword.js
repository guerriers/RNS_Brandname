import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'


const NewPassword = () => {
    const { token } = useParams();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert('Password updated successfully')
            navigate('/login')
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(token, formData))
        setPassword('');
        setConfirmPassword('')
    }

    return (
        <Fragment>
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Set Password
                </button>

            </form>

        </Fragment>
    )
}

export default NewPassword