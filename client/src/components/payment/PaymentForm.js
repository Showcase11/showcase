import { Checkbox, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentImg from '../../assets/payment.png'
import useUser from '../hooks/useUser';
import styles from './Payment.module.css'


const PaymentForm = ({ setUsers }) => {

    // hooks 


    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [value, setValue] = useState('')
    const [pay, setPay] = useState(0)
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [success, setSuccess] = useState('')
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const navigate = useNavigate()


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token !== undefined && token !== null) {
            token = token.replace(/['"]+/g, "");

            fetch("http://3.110.108.123:5000/user/infor", {
                method: "GET",
                headers: {
                    Authorization: token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setUser(data)
                    setUsers(data)
                    setEmail(data?.email)
                    setPhone(data?.country + data?.phone)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [])


    if (!user) return navigate('/')
    const handleCheck1 = (event) => {
        setChecked1(event.target.checked)
        // alert(event.target.checked)
        setPay(pay + Number(ref1?.current?.innerText.replace(/[^A-Za-z0-9]/g, "")))

    };

    const handleCheck2 = (event) => {
        setChecked2(event.target.checked);
        setPay(pay + Number(ref2?.current?.innerText.replace(/[^A-Za-z0-9]/g, "")))
    };

    const handleCheck3 = (event) => {
        setChecked3(event.target.checked);
        setPay(pay + Number(ref3?.current?.innerText.replace(/[^A-Za-z0-9]/g, "")))
    };
    const handleValue = (e) => {
        setValue(e.target.value)
    }


    const handlePayment = async (e) => {
        e.preventDefault()


        if (pay === 0) {
            setError('Please Select a payment value')
        } else if (!value) {
            setError('Please Select a plan')
        } else {

            setError('')
            if (!user) {
                return navigate('/login')
            }
            // get key 
            console.log(pay)
            const { data } = await axios.get(`http://3.110.108.123:5000/api/v1/payment/createOrder`)

            const { data: result } = await axios.post(`http://3.110.108.123:5000/api/v1/payment/createOrder`, { pay })

            var options = {
                key: data?.data,
                amount: result?.data?.amount,
                currency: "INR",
                name: user?.name,

                description: "Test Transaction",
                image: "https://media-exp1.licdn.com/dms/image/C4D0BAQFb5Nycat7-sQ/company-logo_200_200/0/1613032358511?e=1671667200&v=beta&t=9eH6D-V14HXcMHh9o5adSzsYdt7FNeii01SSC4abPFg",
                order_id: result?.data?.id,
                handler: async function (response) {
                    // verify apii 
                    const { data } = await axios.post("http://3.110.108.123:5000/api/v1/payment/paymentVerification", {
                        response,
                        email,
                        phone,
                        name: user?.name,
                        userId: user?._id,
                        amount: pay,
                        plan: value
                    })

                    setSuccess('Your Payment is success')
                },
                prefill: {
                    name: user?.name,
                    email: email,
                    contact: phone
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#FFA500"
                }
            };
            const razor = new window.Razorpay(options);
            razor.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });

            razor.open();

        }
    }


    return (
        <div>
            <Box

            >
                <Box
                    className={styles.form_container}

                >
                    <Box
                        paddingLeft='30px'
                        paddingTop='30px'
                    >
                        <Typography
                            variant='p'
                            component='p'
                            sx={{
                                color: '#0d2366',
                                fontWeight: '500',
                                fontSize: '18px'
                            }}
                        > Payment Details</Typography>
                        <p style={{
                            width: '30px',
                            height: '5px',
                            background: '#ffa500',
                            marginTop: '20px',
                            display: 'block',
                        }}></p>
                    </Box>
                    <form onSubmit={handlePayment}>
                        <Box
                            padding='30px'
                        >
                            <Box
                                marginTop='50px'

                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '30px'
                                    }}
                                >
                                    <p>Email</p>
                                    <input
                                        value={email}
                                        className={styles.payment_input}
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={true}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                    }}
                                >
                                    <p>Phone</p>
                                    <input
                                        value={phone}
                                        className={styles.payment_input}
                                        type="phone"
                                        onChange={e => setPhone(e.target.value)}
                                        disabled={true}
                                    />
                                </Box>
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '14px'
                                            }}
                                        >
                                            Silver
                                            <span style={{
                                                fontSize: '13px',
                                                display: 'block',
                                                color: '#515978',
                                            }}
                                            >(Optional)</span>
                                        </p>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '232px',
                                                height: '38px',
                                                background: '#fcfcfc',
                                                border: ' 1px solid #e2e2e2',
                                                margin: '30px 0',
                                                cursor: 'pointer'
                                            }}
                                            onChange={handleCheck1}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: '5px'
                                                }}
                                            ><span
                                                ref={ref1}
                                                style={{
                                                    fontWeight: '600'
                                                }}
                                            >₹400.</span>00</p>
                                            <Checkbox
                                                checked={checked1}

                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '14px'
                                            }}
                                        >
                                            Gold
                                            <span style={{
                                                fontSize: '13px',
                                                display: 'block',
                                                color: '#515978',
                                            }}
                                            >(Optional)</span>
                                        </p>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '232px',
                                                height: '38px',
                                                background: '#fcfcfc',
                                                border: ' 1px solid #e2e2e2',
                                                marginBottom: '30px',
                                                cursor: 'pointer'
                                            }}
                                            onChange={handleCheck2}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: '5px'
                                                }}
                                            ><span
                                                ref={ref2}
                                                style={{
                                                    fontWeight: '600'
                                                }}
                                            >₹700.</span>00</p>
                                            <Checkbox
                                                checked={checked2}

                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '14px'
                                            }}
                                        >
                                            Platinum
                                            <span style={{
                                                fontSize: '13px',
                                                display: 'block',
                                                color: '#515978',
                                            }}
                                            >(Optional)</span>
                                        </p>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '232px',
                                                height: '38px',
                                                background: '#fcfcfc',
                                                border: ' 1px solid #e2e2e2',
                                                marginTop: '0',
                                                cursor: 'pointer'
                                            }}
                                            onChange={handleCheck3}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: '5px'
                                                }}
                                            ><span
                                                ref={ref3}
                                                style={{
                                                    fontWeight: '600'
                                                }}
                                            >₹1,000.</span>00</p>
                                            <Checkbox
                                                checked={checked3}

                                            />
                                        </Box>
                                    </Box>

                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '20px'
                                    }}
                                >
                                    <p>Plan</p>
                                    <Select
                                        value={value}
                                        onChange={handleValue}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        style={{
                                            border: ' 1px solid #e2e2e2',
                                            width: '232px',
                                            outline: 'none',
                                            height: '38px'
                                        }}
                                        sx={{

                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                            },
                                            '.MuiSvgIcon-root ': {
                                                fill: "white !important",
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>--Select--</em>
                                        </MenuItem>
                                        <MenuItem value='Silver'>Silver</MenuItem>
                                        <MenuItem value='Gold'>Gold</MenuItem>
                                        <MenuItem value='Platinum'>Platinum</MenuItem>
                                    </Select>
                                </Box>

                            </Box>

                        </Box>
                        {
                            error && <p
                                style={{
                                    textAlign: 'center',
                                    color: 'red',
                                    margin: '24px 0'
                                }}
                            >{error}</p>
                        }
                        {
                            success && <p
                                style={{
                                    textAlign: 'center',
                                    color: 'orange',
                                    margin: '24px 0'
                                }}
                            >
                                {success}
                            </p>
                        }
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingLeft: '30px',
                                alignItems: 'center',
                                background: '#f5f6f7'
                            }}
                        >
                            <Box
                                sx={{

                                    background: '#f5f6f7',
                                    height: '100%'
                                }}
                            >
                                <img
                                    style={{
                                        width: '200px',
                                    }}
                                    src={paymentImg} alt="img" />
                            </Box>
                            <Box>
                                <button
                                    className={styles.btn}
                                    type='submit'
                                >Pay ₹ {pay.toLocaleString()}.00</button>
                            </Box>
                        </Box>
                    </form>

                </Box>

            </Box>
        </div>
    );
};

export default PaymentForm;