import React from 'react';
import Footer from '../../components/footer';
import Nav2 from '../../components/nav2';
import Style from '../../style/style.module.css'



const Welcome = () => {
    return (
        <>
            <Nav2 />
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">welcome to shop</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </header>
            <div className='container text-center mt-5'><h1 >Sign up as:</h1></div>
            <main className='container' style={{ marginTop: '-10%' }}>
                <div className="row mx-5 px-5">
                    <div className={`${Style.container} ${Style.log} col py-5 mx-5 px-5`}>
                        <a href='/login-seller'><h2 className='py-5'>Seller</h2></a>
                    </div>

                    <div className={`${Style.container} ${Style.log} col py-5 mx-5 px-5`}>
                        <a href='/login-shopper'><h2 className='py-5'>Shopper</h2></a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Welcome;