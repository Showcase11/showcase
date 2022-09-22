import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import logo from '../../assets/logo.jpg'

import styles from './Payment.module.css'
import PaymentForm from './PaymentForm';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const PaymentFrontend = () => {

    const [users, setUsers] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        console.log(token)
        if (!token) {
            console.log('click')
            return navigate('/login')
        }
    }, [navigate,token])
    return (
        <Container
            sx={{
                width: '1000px',
                margin: 'auto'
            }}
        >
            <div>
                <Box
                    marginTop='60px'
                    minHeight='100vh'
                >
                    <Grid
                        container

                    >
                        <Grid
                            item
                            xs={6}

                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}
                            >
                                <div
                                    className={styles.header_logo}
                                >
                                    <img className={styles.logo} src={logo} alt="logo" />
                                </div>
                                <Typography
                                    variant='p'
                                    component='p'
                                    sx={{
                                        color: '#0d2366',
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}
                                >
                                    Qurinomsolutions
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant='p'
                                    container='p'
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: '600',
                                        color: '#0d2366',
                                        marginTop: '40px',
                                        display: 'block'
                                    }}
                                >Subscription</Typography>
                                <p style={{
                                    width: '30px',
                                    height: '5px',
                                    background: '#ffa500',
                                    marginTop: '20px',
                                    display: 'block',
                                }}></p>
                            </Box>
                            <Box>
                                <Typography
                                    variant='p'
                                    container='p'
                                    sx={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        color: '#0d2366',
                                        marginTop: '40px',
                                        display: 'block'
                                    }}
                                >Choose Any One Plan</Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant='p'
                                    container='p'
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#0d2366',
                                        marginTop: '120px',
                                        display: 'block'
                                    }}
                                >
                                    Contact Us:
                                </Typography>
                                <Box
                                    marginTop='20px'
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,

                                        }}
                                    >
                                        <EmailIcon
                                            fontSize='68px'
                                        />
                                        <Typography
                                            variant='p'
                                            container='p'
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                color: '#0d2366',
                                                display: 'block',
                                                cursor: 'pointer',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            consulting@qurinomsolutions.com
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,

                                        }}
                                    >
                                        <PhoneIcon
                                            fontSize='14px'
                                        />
                                        <Typography
                                            variant='p'
                                            container='p'
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                color: '#0d2366',
                                                display: 'block',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            +918668567433
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                marginTop='50px'
                            >
                                <Typography
                                    variant='p'
                                    container='p'
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        color: '#0d2366',
                                        display: 'block',

                                    }}
                                >Terms & Conditions:</Typography>
                                <article
                                    className={styles.terms}
                                >
                                    You agree to share information entered on this page with Qurinomsolutions (owner of this page) and Razorpay, adhering to applicable laws.
                                </article>
                            </Box>

                        </Grid>

                        <Grid
                            item
                            xs={6}
                            background='red'
                        >
                            <PaymentForm
                                setUsers={setUsers}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Container>
    );
};

export default PaymentFrontend;