import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import VocabularyAppService from '../VocabularyAppService';

const vocabularyService = new VocabularyAppService()

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password_1, setPassword_1] = useState('')
    const [password_2, setPassword_2] = useState('')
    const [registered, setRegistered] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await vocabularyService.register({
                'username': username,
                'password_1': password_1,
                'password_2': password_2
            });
            setRegistered(response)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail);
            }
        }
    }


    return (
        <div className="Form-container">
            <form className="Form" onSubmit={handleSubmit}>
                {registered ?
                    <>
                        <div class="Auth-form-content">
                            <h3 class="Auth-form-title">Registration successful!</h3>
                            <ul class="Result-list">
                                <li class="Result-list-item">
                                    <span class="Result-label">Ваш логін: </span>
                                    <span class="Result-value">{registered.username}</span>
                                </li>
                                <li class="Result-list-item">
                                    <span class="Result-label">Ваш пароль: </span>
                                    <span class="Result-value">{registered.password}</span>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    <>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Реєстрація</h3>
                            <div className="form-group mt-3">
                                <label>Логін</label>
                                <input
                                    id='username'
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter login"
                                    maxLength='20'
                                    required={true}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Пароль</label>
                                <input
                                    id='password_1'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    required={true}
                                    onChange={(event) => setPassword_1(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Повторіть пароль</label>
                                <input
                                    id='password_2'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password again"
                                    required={true}
                                    onChange={(event) => setPassword_2(event.target.value)}
                                />
                            </div>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                Вже <NavLink to="/login">зареєстровані?</NavLink>
                            </p>
                        </div>
                    </>
                }

            </form>
        </div>
    )
}

export default RegisterPage;